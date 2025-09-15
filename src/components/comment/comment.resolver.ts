import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { PaginationArgs, ResponsePropio } from 'src/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser, User } from '../auth';

@Resolver(() => Comment)
@UseGuards(AuthGuard)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  public async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.create(createCommentInput, user);
  }

  @Query(() => [Comment], { name: 'allComment' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Comment[]> {
    return await this.commentService.findAll(paginationArgs);
  }

  @Query(() => Comment, { name: 'comment' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Comment> {
    return await this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  public async updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return await this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
      user,
    );
  }

  @Mutation(() => ResponsePropio)
  public async removeComment(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropio> {
    return await this.commentService.remove(id);
  }
}
