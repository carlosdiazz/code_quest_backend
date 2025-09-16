import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LikeSubCommentService } from './like-sub-comment.service';
import { LikeSubComment } from './entities/like-sub-comment.entity';
import { CreateLikeSubCommentInput } from './dto/create-like-sub-comment.input';

@Resolver(() => LikeSubComment)
export class LikeSubCommentResolver {
  constructor(private readonly likeSubCommentService: LikeSubCommentService) {}

  @Mutation(() => LikeSubComment)
  createLikeSubComment(
    @Args('createLikeSubCommentInput')
    createLikeSubCommentInput: CreateLikeSubCommentInput,
  ) {
    return this.likeSubCommentService.create(createLikeSubCommentInput);
  }

  @Query(() => [LikeSubComment], { name: 'likeSubComment' })
  findAll() {
    return this.likeSubCommentService.findAll();
  }

  @Query(() => LikeSubComment, { name: 'likeSubComment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.likeSubCommentService.findOne(id);
  }

  @Mutation(() => LikeSubComment)
  removeLikeSubComment(@Args('id', { type: () => Int }) id: number) {
    return this.likeSubCommentService.remove(id);
  }
}
