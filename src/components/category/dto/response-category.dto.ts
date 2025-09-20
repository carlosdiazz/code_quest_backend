import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Category } from '../entities/category.entity';

@ObjectType()
export class ResponseCategoryDTO {
  @Field(() => [Category])
  public items: Category[];

  @Field(() => Int)
  public total: number;
}
