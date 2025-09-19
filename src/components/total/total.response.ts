import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TotalResponse {
  @Field(() => Int)
  public total_post: number;

  @Field(() => Int)
  public total_post_published: number;

  @Field(() => Int)
  public total_category: number;

  @Field(() => Int)
  public total_user: number;

  @Field(() => Int)
  public total_user_admin: number;

  @Field(() => Int)
  public total_comment: number;

  @Field(() => Int)
  public total_sub_comment: number;

  @Field(() => Int)
  public total_view: number;
}
