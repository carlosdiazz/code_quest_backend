import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { AuthModule } from '../auth';
import { CategoryModule } from '../category';
import { PostModule } from '../post';
import { CommentModule } from '../comment';
import { SubCommentModule } from '../sub-comment';
import { LikePostModule } from '../like-post';
import { LikeCommentModule } from '../like-comment';
import { LikeSubCommentModule } from '../like-sub-comment';
import { BookmarkModule } from '../bookmark';
import { PostViewModule } from '../post-view';
import { ImageModule } from '../image';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    PostModule,
    CommentModule,
    SubCommentModule,
    LikePostModule,
    LikeCommentModule,
    LikeSubCommentModule,
    BookmarkModule,
    PostViewModule,
    ImageModule,
  ],
  providers: [SeedResolver, SeedService],
})
export class SeedModule {}
