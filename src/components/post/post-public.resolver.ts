import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { ResponseOnePostDTO, ResponsePostDTO, AllPostArgs } from './dto';

import { AuthGuardPublic, CurrentUserOptional, User } from '../auth';

@Resolver(() => Post)
@UseGuards(AuthGuardPublic)
export class PostPublicResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => ResponsePostDTO, { name: 'allPost' })
  public async findAll(
    @Args() paginationArgs: AllPostArgs,
  ): Promise<ResponsePostDTO> {
    return await this.postService.findAll(paginationArgs);
  }

  @Query(() => ResponseOnePostDTO, { name: 'postBySlug' })
  public async findOneBySlug(
    @Args('slug', { type: () => String }) slug: string,
    @CurrentUserOptional() user: User | undefined,
  ): Promise<ResponseOnePostDTO> {
    return await this.postService.findBySlug(slug, user);
  }
}
