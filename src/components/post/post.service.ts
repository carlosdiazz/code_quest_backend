import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { MESSAGE, PaginationArgs, ResponsePropio } from 'src/common';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
  ) {}

  public async create(createPostInput: CreatePostInput): Promise<Post> {
    const { slug, ...rest } = createPostInput;
    await this.findOneBySlug(slug);

    try {
      const newEntity = this.repository.create({
        slug,
        ...rest,
      });
      const entity = await this.repository.save(newEntity);
      return await this.findOne(entity.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async findAll(pagination: PaginationArgs): Promise<Post[]> {
    const { limit, offset } = pagination;

    return await this.repository.find({
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: number): Promise<Post> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Category`);
    }
    return entity;
  }

  public async update(
    id: number,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    const entity = await this.findOne(id);
    //TODO const { slug } = updateCategoryInput;
    //TODO if (slug) {
    //TODO   await this.findOneBySlug(slug);
    //TODO }

    try {
      this.repository.merge(entity, updatePostInput);
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

  private async findOneBySlug(slug: string): Promise<void> {
    const entity = await this.repository.findOneBy({ slug });
    if (entity) {
      throw new BadRequestException(`${MESSAGE.YA_EXISTE_ESTE_SLUG} => Post`);
    }
  }
}
