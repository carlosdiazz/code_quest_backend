import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { Post } from './entities/post.entity';
import { CategoryModule } from '../category';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoryModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
