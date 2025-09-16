import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLikeInput } from './dto/create-like.input';

import { LikePost } from './entities/like-post.entity';
import { MESSAGE, PaginationArgs, ResponsePropio } from '../../common';
import { User } from '../auth';
import { PostService } from '../post';

@Injectable()
export class LikePostService {
  constructor(
    @InjectRepository(LikePost)
    private readonly repository: Repository<LikePost>,
    private readonly postService: PostService,
  ) {}

  public async create(
    createLikeInput: CreateLikeInput,
    user: User,
  ): Promise<LikePost> {
    const { id_post } = createLikeInput;

    await this.postService.findOneById(id_post);
    await this.verifyByUser(id_post, user.id);

    try {
      const newEntity = this.repository.create({
        post: {
          id: id_post,
        },
        user: {
          id: user.id,
        },
      });
      const entity = await this.repository.save(newEntity);

      return await this.findOne(entity.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async findAll(paginationArgs: PaginationArgs): Promise<LikePost[]> {
    const { limit, offset } = paginationArgs;

    return await this.repository.find({
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: number): Promise<LikePost> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Like`);
    }
    return entity;
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

  private async verifyByUser(id_post: number, id_user: number): Promise<void> {
    const entity = await this.repository.findOne({
      where: {
        user: { id: id_user },
        post: { id: id_post },
      },
    });

    if (entity) {
      throw new BadGatewayException('No puedes volver a dar Like');
    }
  }
}
