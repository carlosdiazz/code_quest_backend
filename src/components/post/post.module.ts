import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { Post } from './entities/post.entity';
import { PostPublicResolver } from './post-public.resolver';
import { CategoryModule } from '../category';
import { PostViewModule } from '../post-view';
import { ImageModule } from '../image';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    CategoryModule,
    PostViewModule,
    ImageModule,
  ],
  providers: [PostResolver, PostPublicResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
