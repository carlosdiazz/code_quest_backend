import { IsNumber, Min } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

import { CreateCategoryInput } from './create-category.input';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  public id: number;
}
