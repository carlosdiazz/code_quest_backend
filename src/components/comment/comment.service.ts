import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { MESSAGE, PaginationArgs, ResponsePropio } from 'src/common';
import { Comment } from './entities/comment.entity';
import { PostService } from '../post';
import { Role, User } from '../auth';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
    private readonly postService: PostService,
  ) {}

  public async create(
    createCommentInput: CreateCommentInput,
    user: User,
  ): Promise<Comment> {
    const { id_post, ...rest } = createCommentInput;

    await this.postService.findOneById(id_post);

    try {
      const newEntity = this.repository.create({
        post: {
          id: id_post,
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

  public async findAll(paginationArgs: PaginationArgs): Promise<Comment[]> {
    const { limit, offset } = paginationArgs;

    return await this.repository.find({
      order: {
        createAt: 'DESC',
      },
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: number): Promise<Comment> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Comment`);
    }
    return entity;
  }

  public async update(
    id: number,
    updateCommentInput: UpdateCommentInput,
    user: User,
  ): Promise<Comment> {
    const entity = await this.findOne(id);

    if (entity.user.id != user.id) {
      throw new UnprocessableEntityException(
        `No puedes editar un comentario que no es suyo`,
      );
    }

    const { content } = updateCommentInput;

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
}
