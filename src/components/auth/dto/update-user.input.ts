import { IsNumber, Min } from 'class-validator';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['provider', 'email', 'providerId'] as const),
) {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  public id: number;
}
