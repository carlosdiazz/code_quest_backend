import { IsNumber, Min } from 'class-validator';
import { CreateSubCommentInput } from './create-sub-comment.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateSubCommentInput extends PartialType(
  OmitType(CreateSubCommentInput, ['id_comment'] as const),
) {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id: number;
}
