import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookmarkService } from './bookmark.service';
import { BookmarkResolver } from './bookmark.resolver';
import { Bookmark } from './entities/bookmark.entity';
import { PostModule } from '../post';
import { AuthModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark]), PostModule, AuthModule],
  providers: [BookmarkResolver, BookmarkService],
  exports: [BookmarkService],
})
export class BookmarkModule {}
