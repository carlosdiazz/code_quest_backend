import { InputType, Field } from '@nestjs/graphql';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const SLUG_REGEX =
  /^(?![-_])(?!.*[-_]{2})(?=.{1,15}$)[a-z0-9]+(?:[-_][a-z0-9]+)*$/;

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsString()
  @MinLength(2)
  public name: string;

  @Field(() => String)
  @IsString()
  @Matches(SLUG_REGEX, {
    message:
      'slug inválido: 1-15 chars, sólo letras minúsculas, números y guiones; no puede empezar con "-" ni contener "--" ni espacios.',
  })
  public slug: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  public description?: string;

  @Field(() => String)
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @Matches(/^[0-9a-fA-F]{6}$/, {
    message: 'El color debe ser un código hexadecimal válido sin #',
  })
  public color: string;
}
