import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { ResponsePropio } from 'src/common';

import { AuthGuard, CurrentUser, Role, User } from '../auth';

@Resolver(() => Post)
@UseGuards(AuthGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  public async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser(Role.ADMIN) user: User,
  ): Promise<Post> {
    return await this.postService.create(createPostInput, user);
  }

  @Query(() => Post, { name: 'post' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Post> {
    return await this.postService.findOne(id);
  }

  @Mutation(() => Post)
  public async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @CurrentUser(Role.ADMIN) user: User,
  ): Promise<Post> {
    return await this.postService.update(
      updatePostInput.id,
      updatePostInput,
      user,
    );
  }

  @Mutation(() => ResponsePropio)
  public async removePost(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser(Role.ADMIN) _user: User,
  ): Promise<ResponsePropio> {
    return await this.postService.remove(id);
  }
}
