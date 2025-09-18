import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePostViewInput } from './dto/create-post-view.input';
import { PostView } from './entities/post-view.entity';

@Injectable()
export class PostViewService {
  constructor(
    @InjectRepository(PostView)
    private readonly repository: Repository<PostView>,
  ) {}

  private readonly logger = new Logger('PostViewService');

  public async create(createPostViewInput: CreatePostViewInput) {
    try {
      const { id_post, id_user } = createPostViewInput;

      const entity = await this.repository.findOne({
        where: {
          user: { id: id_user },
          post: { id: id_post },
        },
      });

      if (entity) return;

      const newEntity = this.repository.create({
        post: {
          id: id_post,
        },
        user: {
          id: id_user,
        },
      });
      await this.repository.save(newEntity);
    } catch {
      this.logger.error('No se creo el PostView');
    }
  }
}
