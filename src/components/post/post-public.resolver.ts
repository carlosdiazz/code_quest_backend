import { Resolver, Query, Args } from '@nestjs/graphql';

import { PostService } from './post.service';
import { Post } from './entities/post.entity';

import { PaginationArgs } from 'src/common';

import { AuthGuardPublic, CurrentUserOptional, User } from '../auth';
import { ResponseOnePostDTO, ResponsePostDTO } from './dto/response-post.dto';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Post)
@UseGuards(AuthGuardPublic)
export class PostPublicResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => ResponsePostDTO, { name: 'allPost' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
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
