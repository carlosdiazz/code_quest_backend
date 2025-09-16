import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikeCommentService } from './like-comment.service';
import { LikeCommentResolver } from './like-comment.resolver';
import { LikeComment } from './entities/like-comment.entity';
import { CommentModule } from '../comment';
import { AuthModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([LikeComment]), CommentModule, AuthModule],
  providers: [LikeCommentResolver, LikeCommentService],
  exports: [LikeCommentService],
})
export class LikeCommentModule {}
