import { IsNumber, Min } from 'class-validator';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

import { CreateCommentInput } from './create-comment.input';

@InputType()
export class UpdateCommentInput extends PartialType(
  OmitType(CreateCommentInput, ['parent_id', 'id_post'] as const),
) {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id: number;
}
