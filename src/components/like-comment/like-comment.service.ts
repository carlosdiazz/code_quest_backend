import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLikeCommentInput } from './dto/create-like-comment.input';
import { LikeComment } from './entities/like-comment.entity';
import { CommentService } from '../comment';
import { MESSAGE, PaginationArgs, ResponsePropio } from 'src/common';
import { User } from '../auth';

@Injectable()
export class LikeCommentService {
  constructor(
    @InjectRepository(LikeComment)
    private readonly repository: Repository<LikeComment>,
    private readonly commentService: CommentService,
  ) {}

  public async create(
    createLikeCommentInput: CreateLikeCommentInput,
    user: User,
  ): Promise<LikeComment> {
    const { id_comment } = createLikeCommentInput;

    const comment = await this.commentService.findOne(id_comment);
    await this.verifyByUser(id_comment, user.id);

    try {
      const newEntity = this.repository.create({
        comment: {
          id: id_comment,
        },
        user: {
          id: user.id,
        },
      });
      const entity = await this.repository.save(newEntity);

      // Actualizar el contador de likes en el post
      comment.likesCount += 1;
      await this.commentService.updateLikesCount(
        comment.id,
        comment.likesCount,
      );

      return await this.findOne(entity.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async findAll(paginationArgs: PaginationArgs): Promise<LikeComment[]> {
    const { limit, offset } = paginationArgs;

    return await this.repository.find({
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: number): Promise<LikeComment> {
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

  private async verifyByUser(
    id_comment: number,
    id_user: number,
  ): Promise<void> {
    const entity = await this.repository.findOne({
      where: {
        user: { id: id_user },
        comment: { id: id_comment },
      },
    });

    if (entity) {
      throw new BadGatewayException('No puedes volver a dar Like');
    }
  }
}
