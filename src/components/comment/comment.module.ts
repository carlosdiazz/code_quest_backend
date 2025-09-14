import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { Comment } from './entities/comment.entity';
import { PostModule } from '../post';
import { UserModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), PostModule, UserModule],
  providers: [CommentResolver, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
