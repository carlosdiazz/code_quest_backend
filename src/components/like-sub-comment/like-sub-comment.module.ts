import { Module } from '@nestjs/common';
import { LikeSubCommentService } from './like-sub-comment.service';
import { LikeSubCommentResolver } from './like-sub-comment.resolver';

@Module({
  providers: [LikeSubCommentResolver, LikeSubCommentService],
})
export class LikeSubCommentModule {}
