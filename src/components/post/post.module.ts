import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { Post } from './entities/post.entity';
import { CategoryModule } from '../category';
import { AuthModule } from '../auth';
import { PostPublicResolver } from './post-public.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoryModule, AuthModule],
  providers: [PostResolver, PostPublicResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
