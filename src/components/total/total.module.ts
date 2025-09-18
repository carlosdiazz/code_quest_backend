import { Module } from '@nestjs/common';
import { TotalService } from './total.service';
import { TotalResolver } from './total.resolver';
import { CategoryModule } from '../category';
import { PostModule } from '../post';
import { CommentModule } from '../comment';
import { SubCommentModule } from '../sub-comment';

@Module({
  imports: [CategoryModule, PostModule, CommentModule, SubCommentModule],
  providers: [TotalResolver, TotalService],
})
export class TotalModule {}
