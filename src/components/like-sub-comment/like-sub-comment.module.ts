import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikeSubCommentService } from './like-sub-comment.service';
import { LikeSubCommentResolver } from './like-sub-comment.resolver';
import { LikeSubComment } from './entities/like-sub-comment.entity';
import { SubCommentModule } from '../sub-comment';
import { UserModule } from '../auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeSubComment]),
    SubCommentModule,
    UserModule,
  ],
  providers: [LikeSubCommentResolver, LikeSubCommentService],
  exports: [LikeSubCommentService],
})
export class LikeSubCommentModule {}
