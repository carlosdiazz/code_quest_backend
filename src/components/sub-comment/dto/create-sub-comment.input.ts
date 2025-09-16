import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreateSubCommentInput {
  @Field(() => String)
  @IsString()
  public content: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  public id_comment: number;
}
