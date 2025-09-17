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
import { MESSAGE, ResponsePropio } from 'src/common';
import { Post } from './entities/post.entity';
import { CategoryService } from '../category';
import { User } from '../auth';
import { ResponseOnePostDTO, ResponsePostDTO } from './dto/response-post.dto';
import { AllPostArgs } from './dto/all-post.args';

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
    await this.verifySlug(slug);
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
      return await this.findOneById(entity.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async findAll(pagination: AllPostArgs): Promise<ResponsePostDTO> {
    const { limit, offset, id_category } = pagination;

    const [total, items] = await Promise.all([
      this.repository.count({
        where: { category: { id: id_category } },
      }),
      this.repository.find({
        where: {
          category: { id: id_category },
        },
        order: { createAt: 'DESC' },
        take: limit,
        skip: offset,
      }),
    ]);

    return {
      items,
      total,
    };
  }

  public async findOneById(id: number): Promise<Post> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Post`);
    }
    return entity;
  }

  public async findBySlug(
    slug: string,
    user: User | undefined,
  ): Promise<ResponseOnePostDTO> {
    const item = await this.findOneBySlug(slug);

    let is_like = false;
    let is_bookmark = false;

    if (user) {
      const [itemByLike, itemByBookmark] = await Promise.all([
        this.repository.findOne({
          where: {
            slug,
            like_post: {
              user: {
                providerId: user?.providerId,
              },
            },
          },
        }),

        this.repository.findOne({
          where: {
            slug,
            bookmark_post: {
              user: {
                providerId: user?.providerId,
              },
            },
          },
        }),
      ]);

      if (itemByLike) is_like = true;
      if (itemByBookmark) is_bookmark = true;
    }

    return {
      item,
      is_like,
      is_bookmark,
    };
  }

  public async update(
    id: number,
    updatePostInput: UpdatePostInput,
    user: User,
  ): Promise<Post> {
    const entity = await this.findOneById(id);

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
      await this.verifySlug(slug, id);
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
    const entity = await this.findOneById(id);
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

  private async findOneBySlug(slug: string): Promise<Post> {
    const entity = await this.repository.findOne({
      where: { slug },
    });

    if (!entity) throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Post`);

    return entity;
  }

  private async verifySlug(slug: string, currentId?: number): Promise<void> {
    const entity = await this.repository.findOne({ where: { slug } });

    if (entity && entity.id !== currentId) {
      throw new BadRequestException(`${MESSAGE.YA_EXISTE_ESTE_SLUG} => Post`);
    }
  }
}
