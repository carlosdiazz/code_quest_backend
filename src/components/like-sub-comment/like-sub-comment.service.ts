import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLikeSubCommentInput } from './dto/create-like-sub-comment.input';
import { LikeSubComment } from './entities/like-sub-comment.entity';
import { SubCommentService } from '../sub-comment';
import { User } from '../auth';
import { MESSAGE, PaginationArgs, ResponsePropio } from 'src/common';

@Injectable()
export class LikeSubCommentService {
  constructor(
    @InjectRepository(LikeSubComment)
    private readonly repository: Repository<LikeSubComment>,
    private readonly subCommentService: SubCommentService,
  ) {}

  public async create(
    createLikeSubCommentInput: CreateLikeSubCommentInput,
    user: User,
  ): Promise<LikeSubComment> {
    const { id_sub_comment } = createLikeSubCommentInput;

    await this.subCommentService.findOne(id_sub_comment);
    await this.verifyByUser(id_sub_comment, user.id);

    try {
      const newEntity = this.repository.create({
        sub_comment: {
          id: id_sub_comment,
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

  public async findAll(
    paginationArgs: PaginationArgs,
  ): Promise<LikeSubComment[]> {
    const { limit, offset } = paginationArgs;

    return await this.repository.find({
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: number): Promise<LikeSubComment> {
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
    id_sub_comment: number,
    id_user: number,
  ): Promise<void> {
    const entity = await this.repository.findOne({
      where: {
        user: { id: id_user },
        sub_comment: { id: id_sub_comment },
      },
    });

    if (entity) {
      throw new BadGatewayException('No puedes volver a dar Like');
    }
  }
}
