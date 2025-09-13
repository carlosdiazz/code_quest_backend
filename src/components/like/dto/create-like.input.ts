import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class CreateLikeInput {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  public id_post: number;
}
