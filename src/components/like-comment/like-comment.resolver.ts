import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { LikeCommentService } from './like-comment.service';
import { LikeComment } from './entities/like-comment.entity';
import { CreateLikeCommentInput } from './dto/create-like-comment.input';
import { AuthGuard, CurrentUser, User } from '../auth';
import { PaginationArgs, ResponsePropio } from '../../common';

@Resolver(() => LikeComment)
@UseGuards(AuthGuard)
export class LikeCommentResolver {
  constructor(private readonly likeCommentService: LikeCommentService) {}

  @Mutation(() => LikeComment)
  public async createLikeComment(
    @Args('createLikeCommentInput')
    createLikeCommentInput: CreateLikeCommentInput,
    @CurrentUser() user: User,
  ): Promise<LikeComment> {
    return await this.likeCommentService.create(createLikeCommentInput, user);
  }

  @Query(() => [LikeComment], { name: 'allLikeComment' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<LikeComment[]> {
    return await this.likeCommentService.findAll(paginationArgs);
  }

  @Query(() => LikeComment, { name: 'likeComment' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<LikeComment> {
    return await this.likeCommentService.findOne(id);
  }

  @Mutation(() => ResponsePropio)
  public async removeLikeComment(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropio> {
    return await this.likeCommentService.remove(id);
  }
}
