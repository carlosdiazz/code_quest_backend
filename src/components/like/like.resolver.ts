import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';

import { PaginationArgs, ResponsePropio } from 'src/common';
import { AuthGuard, CurrentUser, User } from '../user';

@Resolver(() => Like)
@UseGuards(AuthGuard)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like)
  public async createLike(
    @Args('createLikeInput') createLikeInput: CreateLikeInput,
    @CurrentUser() user: User,
  ): Promise<Like> {
    return await this.likeService.create(createLikeInput, user);
  }

  @Query(() => [Like], { name: 'allLike' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Like[]> {
    return await this.likeService.findAll(paginationArgs);
  }

  @Query(() => Like, { name: 'like' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Like> {
    return await this.likeService.findOne(id);
  }

  @Mutation(() => ResponsePropio)
  public async removeLike(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropio> {
    return await this.likeService.remove(id);
  }
}
