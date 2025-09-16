import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { SubCommentService } from './sub-comment.service';
import { SubComment } from './entities/sub-comment.entity';
import { CreateSubCommentInput } from './dto/create-sub-comment.input';
import { UpdateSubCommentInput } from './dto/update-sub-comment.input';

import { AuthGuard, CurrentUser, User } from '../auth';
import { PaginationArgs, ResponsePropio } from 'src/common';

@Resolver(() => SubComment)
@UseGuards(AuthGuard)
export class SubCommentResolver {
  constructor(private readonly subCommentService: SubCommentService) {}

  @Mutation(() => SubComment)
  public async createSubComment(
    @Args('createSubCommentInput') createSubCommentInput: CreateSubCommentInput,
    @CurrentUser() user: User,
  ): Promise<SubComment> {
    return await this.subCommentService.create(createSubCommentInput, user);
  }

  @Query(() => [SubComment], { name: 'allSubComment' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<SubComment[]> {
    return await this.subCommentService.findAll(paginationArgs);
  }

  @Query(() => SubComment, { name: 'subComment' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<SubComment> {
    return await this.subCommentService.findOne(id);
  }

  @Mutation(() => SubComment)
  public async updateSubComment(
    @Args('updateSubCommentInput') updateSubCommentInput: UpdateSubCommentInput,
    @CurrentUser() user: User,
  ) {
    return await this.subCommentService.update(
      updateSubCommentInput.id,
      updateSubCommentInput,
      user,
    );
  }

  @Mutation(() => SubComment)
  public async removeSubComment(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<ResponsePropio> {
    return await this.subCommentService.remove(id, user);
  }
}
