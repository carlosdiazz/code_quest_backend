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
import { CategoryService } from '../category';
import { User } from '../user';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly repository: Repository<Post>,
    private readonly categoryService: CategoryService,
  ) {}

  public async create(
    createPostInput: CreatePostInput,
    user: User,
  ): Promise<Post> {
    const { slug, id_category, ...rest } = createPostInput;
    await this.findOneBySlug(slug);
    await this.categoryService.findOne(id_category);

    try {
      const newEntity = this.repository.create({
        slug,
        category: {
          id: id_category,
        },
        user: {
          id: user.id,
        },
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
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Post`);
    }
    return entity;
  }

  public async findBySlug(slug: string): Promise<Post> {
    const entity = await this.repository.findOneBy({ slug });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Post`);
    }
    return entity;
  }

  public async update(
    id: number,
    updatePostInput: UpdatePostInput,
    user: User,
  ): Promise<Post> {
    const entity = await this.findOne(id);

    if (entity.user.id != user.id) {
      throw new UnprocessableEntityException(
        `No puedes editar un post que no es suyo`,
      );
    }

    const { slug, id_category, ...rest } = updatePostInput;

    if (id_category) {
      const category = await this.categoryService.findOne(id_category);
      entity.category = category;
    }

    if (slug) {
      await this.findOneBySlug(slug, id);
    }

    try {
      this.repository.merge(entity, {
        slug: slug,
        ...rest,
      });
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

  public async updateLikesCount(id: number, likesCount: number): Promise<void> {
    await this.repository.update(id, { likesCount });
  }

  private async findOneBySlug(slug: string, currentId?: number): Promise<void> {
    const entity = await this.repository.findOne({ where: { slug } });

    if (entity && entity.id !== currentId) {
      throw new BadRequestException(`${MESSAGE.YA_EXISTE_ESTE_SLUG} => Post`);
    }
  }
}
