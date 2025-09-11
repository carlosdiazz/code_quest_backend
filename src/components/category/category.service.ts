import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { MESSAGE, PaginationArgs, ResponsePropio } from 'src/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async create(
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const { slug, ...rest } = createCategoryInput;
    await this.findOneBySlug(slug);

    try {
      const newCategory = this.categoryRepository.create({
        slug,
        ...rest,
      });
      const category = await this.categoryRepository.save(newCategory);
      return await this.findOne(category.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async findAll(pagination: PaginationArgs): Promise<Category[]> {
    const { limit, offset } = pagination;

    return await this.categoryRepository.find({
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Category`);
    }
    return category;
  }

  public async update(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const category = await this.findOne(id);
    const { slug } = updateCategoryInput;

    if (slug) {
      await this.findOneBySlug(slug);
    }

    try {
      this.categoryRepository.merge(category, updateCategoryInput);
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async remove(id: number): Promise<ResponsePropio> {
    const category = await this.findOne(id);
    try {
      await this.categoryRepository.remove(category);
      return {
        message: MESSAGE.SE_ELIMINO_CORRECTAMENTE,
        statusCode: 200,
      };
    } catch {
      throw new BadGatewayException(MESSAGE.NO_SE_PUEDE_ELIMINAR);
    }
  }

  private async findOneBySlug(slug: string): Promise<void> {
    const category = await this.categoryRepository.findOneBy({ slug });
    if (category) {
      throw new BadRequestException(
        `${MESSAGE.YA_EXISTE_ESTE_SLUG} => Category`,
      );
    }
  }
}
