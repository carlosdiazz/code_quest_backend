import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class ResponseAllUserDTO {
  @Field(() => [User])
  public items: User[];

  @Field(() => Int)
  public total: number;
}
