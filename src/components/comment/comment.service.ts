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
import { User } from '../user';

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

    await this.postService.findOne(id_post);

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
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: number): Promise<Comment> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Category`);
    }
    return entity;
  }

  public async update(
    id: number,
    updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    const entity = await this.findOne(id);

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
}
