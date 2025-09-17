import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBookmarkInput } from './dto/create-bookmark.input';
import { Bookmark } from './entities/bookmark.entity';
import { PostService } from '../post';
import { User } from '../auth';
import { MESSAGE, PaginationArgs, ResponsePropio } from 'src/common';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly repository: Repository<Bookmark>,
    private readonly postService: PostService,
  ) {}

  public async create(
    createBookmarkInput: CreateBookmarkInput,
    user: User,
  ): Promise<Bookmark> {
    const { id_post } = createBookmarkInput;

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

  public async findAll(paginationArgs: PaginationArgs): Promise<Bookmark[]> {
    const { limit, offset } = paginationArgs;

    return await this.repository.find({
      take: limit,
      skip: offset * limit,
    });
  }

  public async findOne(id: number): Promise<Bookmark> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Bookmark`);
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
      throw new BadGatewayException('No puedes volver guardar este Post');
    }
  }
}
