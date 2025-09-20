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
import { MESSAGE, PaginationArgs, ResponsePropio } from '../../common';
import { WsGateway, WsTotalResponse } from '../ws';
import { ENTITY_ENUM } from '../../config';
import { ResponseCategoryDTO } from './dto/response-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
    private readonly wsGateway: WsGateway,
  ) {}

  public async create(
    createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    const { slug, ...rest } = createCategoryInput;
    await this.findOneBySlug(slug);

    try {
      const newEntity = this.repository.create({
        slug,
        ...rest,
      });
      const entity = await this.repository.save(newEntity);
      await this.wsTotal();
      return await this.findOne(entity.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async findAll(
    pagination: PaginationArgs,
  ): Promise<ResponseCategoryDTO> {
    const { limit, offset } = pagination;

    const [total, items] = await Promise.all([
      this.repository.count(),
      this.repository.find({
        order: { createAt: 'DESC' },
        take: limit,
        skip: offset * limit,
      }),
    ]);

    return {
      items,
      total,
    };
  }

  public async findOne(id: number): Promise<Category> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Category`);
    }
    return entity;
  }

  public async update(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const entity = await this.findOne(id);
    const { slug } = updateCategoryInput;
    if (slug) {
      await this.findOneBySlug(slug, id);
    }

    try {
      this.repository.merge(entity, updateCategoryInput);
      return await this.repository.save(entity);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async remove(id: number): Promise<ResponsePropio> {
    const entity = await this.findOne(id);
    try {
      await this.repository.remove(entity);
      return {
        message: MESSAGE.SE_ELIMINO_CORRECTAMENTE,
        statusCode: 200,
      };
    } catch {
      throw new BadGatewayException(MESSAGE.NO_SE_PUEDE_ELIMINAR);
    }
  }

  private async findOneBySlug(slug: string, currentId?: number): Promise<void> {
    const entity = await this.repository.findOne({ where: { slug } });

    if (entity && entity.id !== currentId) {
      throw new BadRequestException(
        `${MESSAGE.YA_EXISTE_ESTE_SLUG} => Category`,
      );
    }
  }

  public async returnTotal(): Promise<number> {
    try {
      return await this.repository.count();
    } catch {
      return 0;
    }
  }

  private async wsTotal() {
    const total = await this.returnTotal();
    const ms: WsTotalResponse = { topic: ENTITY_ENUM.CATEGORY, total };
    this.wsGateway.sendEmitTotal(ms);
  }
}
