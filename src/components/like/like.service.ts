import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLikeInput } from './dto/create-like.input';

import { Like } from './entities/like.entity';
import { MESSAGE, PaginationArgs, ResponsePropio } from '../../common';
import { User } from '../user';
import { PostService } from '../post';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly repository: Repository<Like>,

    private readonly postService: PostService,
  ) {}

  public async create(
    createLikeInput: CreateLikeInput,
    user: User,
  ): Promise<Like> {
    const { id_post } = createLikeInput;

    const post = await this.postService.findOne(id_post);
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

      // Actualizar el contador de likes en el post
      post.likesCount += 1;
      await this.postService.updateLikesCount(post.id, post.likesCount);

      return await this.findOne(entity.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async findAll(paginationArgs: PaginationArgs): Promise<Like[]> {
    const { limit, offset } = paginationArgs;

    return await this.repository.find({
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: number): Promise<Like> {
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
