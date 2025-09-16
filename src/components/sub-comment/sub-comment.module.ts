import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubCommentService } from './sub-comment.service';
import { SubCommentResolver } from './sub-comment.resolver';
import { SubComment } from './entities/sub-comment.entity';
import { CommentModule } from '../comment';
import { AuthModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([SubComment]), CommentModule, AuthModule],
  providers: [SubCommentResolver, SubCommentService],
  exports: [SubCommentService],
})
export class SubCommentModule {}
