import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Role } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  public provider: string;

  @Field(() => String)
  @IsString()
  public providerId: string;

  @Field(() => String)
  @IsString()
  public role: Role;

  @Field(() => String)
  @IsString()
  public avatar: string;

  @Field(() => String)
  @IsString()
  public name: string;

  @Field(() => String)
  @IsString()
  public email: string;
}
