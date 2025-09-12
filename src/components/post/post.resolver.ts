import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';

import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PaginationArgs, ResponsePropio } from 'src/common';

@Resolver(() => Post)
//@UseGuards(AuthGuard)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  public async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return await this.postService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'allPost' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Post[]> {
    return await this.postService.findAll(paginationArgs);
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
  ): Promise<Post> {
    return await this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => ResponsePropio)
  public async removePost(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropio> {
    return await this.postService.remove(id);
  }
}
