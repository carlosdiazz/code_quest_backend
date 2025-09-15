import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';

@ObjectType()
export class ResponsePostDTO {
  @Field(() => [Post])
  public items: Post[];

  @Field(() => Int)
  public total: number;
}
