import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from '../entities/comment.entity';

@ObjectType()
export class ResponseCommentDTO {
  @Field(() => [Comment])
  public items: Comment[];

  @Field(() => Int)
  public total: number;
}
