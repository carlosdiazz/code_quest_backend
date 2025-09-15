import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  @IsString()
  public content: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  public id_post: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  public parent_id?: number; // Opcional: ID del comentario padre si es un reply
}
