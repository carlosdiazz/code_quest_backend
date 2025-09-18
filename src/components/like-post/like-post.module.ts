import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikePost } from './entities/like-post.entity';
import { LikePostResolver } from './like-post.resolver';
import { LikePostService } from './like-post.service';

import { PostModule } from '../post';

@Module({
  imports: [TypeOrmModule.forFeature([LikePost]), PostModule],
  providers: [LikePostResolver, LikePostService],
  exports: [LikePostService],
})
export class LikePostModule {}
