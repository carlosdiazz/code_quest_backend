import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResponsePropio {
  @Field(() => String)
  message: string;

  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Number)
  statusCode: number;
}
