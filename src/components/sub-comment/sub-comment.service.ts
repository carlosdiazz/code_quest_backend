import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSubCommentInput } from './dto/create-sub-comment.input';
import { UpdateSubCommentInput } from './dto/update-sub-comment.input';
import { SubComment } from './entities/sub-comment.entity';
import { CommentService } from '../comment';
import { Role, User } from '../auth';
import { MESSAGE, PaginationArgs, ResponsePropio } from 'src/common';
import { WsGateway, WsTotalResponse } from '../ws';
import { ENTITY_ENUM } from 'src/config';

@Injectable()
export class SubCommentService {
  constructor(
    @InjectRepository(SubComment)
    private readonly repository: Repository<SubComment>,
    private readonly commentService: CommentService,
    private readonly wsGateway: WsGateway,
  ) {}

  public async create(
    createSubCommentInput: CreateSubCommentInput,
    user: User,
  ): Promise<SubComment> {
    const { id_comment, ...rest } = createSubCommentInput;

    await this.commentService.findOne(id_comment);

    try {
      const newEntity = this.repository.create({
        comment: {
          id: id_comment,
        },
        user: {
          id: user.id,
        },
        ...rest,
      });

      const entity = await this.repository.save(newEntity);
      await this.wsTotal();
      return await this.findOne(entity.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async findAll(paginationArgs: PaginationArgs): Promise<SubComment[]> {
    const { limit, offset } = paginationArgs;

    return await this.repository.find({
      order: {
        createAt: 'DESC',
      },
      take: limit,
      skip: offset * limit,
    });
  }

  public async findOne(id: number): Promise<SubComment> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => SubComment`);
    }
    return entity;
  }

  public async update(
    id: number,
    updateSubCommentInput: UpdateSubCommentInput,
    user: User,
  ): Promise<SubComment> {
    const entity = await this.findOne(id);

    if (entity.user.id != user.id) {
      throw new UnprocessableEntityException(
        `No puedes editar un comentario que no es suyo`,
      );
    }

    const { content } = updateSubCommentInput;

    try {
      this.repository.merge(entity, {
        content,
      });
      return await this.repository.save(entity);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async remove(id: number, user: User): Promise<ResponsePropio> {
    const entity = await this.findOne(id);

    if (user.role !== Role.ADMIN) {
      if (entity.user.id != user.id) {
        throw new UnprocessableEntityException(
          `No puedes eliminar un Comentario Ajeno`,
        );
      }
    }

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

  public async returnTotal(): Promise<number> {
    try {
      return await this.repository.count();
    } catch {
      return 0;
    }
  }

  private async wsTotal() {
    const total = await this.returnTotal();
    const ms: WsTotalResponse = { topic: ENTITY_ENUM.SUB_COMMENT, total };
    this.wsGateway.sendEmitTotal(ms);
  }
}
