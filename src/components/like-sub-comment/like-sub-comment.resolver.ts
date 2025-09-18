import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { LikeSubCommentService } from './like-sub-comment.service';
import { LikeSubComment } from './entities/like-sub-comment.entity';
import { CreateLikeSubCommentInput } from './dto/create-like-sub-comment.input';
import { AuthGuard, CurrentUser, User } from '../auth';
import { PaginationArgs, ResponsePropio } from '../../common';

@Resolver(() => LikeSubComment)
@UseGuards(AuthGuard)
export class LikeSubCommentResolver {
  constructor(private readonly likeSubCommentService: LikeSubCommentService) {}

  @Mutation(() => LikeSubComment)
  public async createLikeSubComment(
    @Args('createLikeSubCommentInput')
    createLikeSubCommentInput: CreateLikeSubCommentInput,
    @CurrentUser() user: User,
  ): Promise<LikeSubComment> {
    return await this.likeSubCommentService.create(
      createLikeSubCommentInput,
      user,
    );
  }

  @Query(() => [LikeSubComment], { name: 'allLikeSubComment' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<LikeSubComment[]> {
    return this.likeSubCommentService.findAll(paginationArgs);
  }

  @Query(() => LikeSubComment, { name: 'likeSubComment' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<LikeSubComment> {
    return await this.likeSubCommentService.findOne(id);
  }

  @Mutation(() => ResponsePropio)
  public async removeLikeSubComment(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropio> {
    return await this.likeSubCommentService.remove(id);
  }
}
