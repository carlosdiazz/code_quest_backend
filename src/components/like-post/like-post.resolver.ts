import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { LikePost } from './entities/like-post.entity';
import { CreateLikeInput } from './dto/create-like.input';

import { PaginationArgs, ResponsePropio } from '../../common';
import { AuthGuard, CurrentUser, User } from '../auth';
import { LikePostService } from './like-post.service';

@Resolver(() => LikePost)
@UseGuards(AuthGuard)
export class LikePostResolver {
  constructor(private readonly likeService: LikePostService) {}

  @Mutation(() => LikePost)
  public async createLikePost(
    @Args('createLikePostInput') createLikeInput: CreateLikeInput,
    @CurrentUser() user: User,
  ): Promise<LikePost> {
    return await this.likeService.create(createLikeInput, user);
  }

  @Query(() => [LikePost], { name: 'allLikePost' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<LikePost[]> {
    return await this.likeService.findAll(paginationArgs);
  }

  @Query(() => LikePost, { name: 'likePost' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<LikePost> {
    return await this.likeService.findOne(id);
  }

  @Mutation(() => ResponsePropio)
  public async removeLikePost(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropio> {
    return await this.likeService.remove(id);
  }
}
