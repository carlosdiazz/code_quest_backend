import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl } from 'class-validator';
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

  @Field(() => String, { nullable: true })
  @IsOptional()
  public about?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  public twitter_url?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUrl()
  public instagram_url?: string;
}
