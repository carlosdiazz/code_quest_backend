import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';

import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';

import { PaginationArgs, ResponsePropio } from 'src/common';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @Mutation(() => Like)
  public async createLike(
    @Args('createLikeInput') createLikeInput: CreateLikeInput,
  ): Promise<Like> {
    return this.likeService.create(createLikeInput);
  }

  @Query(() => [Like], { name: 'allLike' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Like[]> {
    return this.likeService.findAll(paginationArgs);
  }

  @Query(() => Like, { name: 'like' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Like> {
    return this.likeService.findOne(id);
  }

  @Mutation(() => ResponsePropio)
  public async removeLike(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropio> {
    return this.likeService.remove(id);
  }
}
