import { Module } from '@nestjs/common';
import { TotalService } from './total.service';
import { TotalResolver } from './total.resolver';
import { AuthModule } from '../auth';
import { CategoryModule } from '../category';
import { PostModule } from '../post';
import { CommentModule } from '../comment';
import { SubCommentModule } from '../sub-comment';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    PostModule,
    CommentModule,
    SubCommentModule,
  ],
  providers: [TotalResolver, TotalService],
})
export class TotalModule {}
