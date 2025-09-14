import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { Post } from './entities/post.entity';
import { CategoryModule } from '../category';
import { UserModule } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), CategoryModule, UserModule],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
