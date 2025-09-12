import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  @IsString()
  public content: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  public id_post: number;
}
