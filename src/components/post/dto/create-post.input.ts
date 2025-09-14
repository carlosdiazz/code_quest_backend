import { InputType, Int, Field } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNumber, IsString, Min } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  @IsString()
  public title: string;

  @Field(() => String)
  @IsString()
  public slug: string;

  @Field(() => String)
  @IsString()
  public content: string;

  @Field(() => String)
  @IsString()
  public excerpt: string;

  @Field(() => String)
  @IsString() //TODO valdiar URL
  public coverImage: string;

  @Field(() => Boolean)
  @IsBoolean()
  public published: boolean;

  @Field(() => Boolean)
  @IsBoolean()
  public featured: boolean;

  //@Field(() => Int)
  //@IsNumber()
  //@Min(0)
  //public likesCount: number;

  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  public tags: string[];

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  public id_category: number;
}
