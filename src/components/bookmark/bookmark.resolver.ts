import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { BookmarkService } from './bookmark.service';
import { Bookmark } from './entities/bookmark.entity';
import { CreateBookmarkInput } from './dto/create-bookmark.input';
import { AuthGuard, CurrentUser, User } from '../auth';
import { PaginationArgs, ResponsePropio } from 'src/common';

@Resolver(() => Bookmark)
@UseGuards(AuthGuard)
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Mutation(() => Bookmark)
  public async createBookmark(
    @Args('createBookmarkInput') createBookmarkInput: CreateBookmarkInput,
    @CurrentUser() user: User,
  ): Promise<Bookmark> {
    return await this.bookmarkService.create(createBookmarkInput, user);
  }

  @Query(() => [Bookmark], { name: 'allBookmark' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Bookmark[]> {
    return await this.bookmarkService.findAll(paginationArgs);
  }

  @Query(() => Bookmark, { name: 'bookmark' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Bookmark> {
    return await this.bookmarkService.findOne(id);
  }

  @Mutation(() => ResponsePropio)
  public async removeBookmark(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropio> {
    return await this.bookmarkService.remove(id);
  }
}
