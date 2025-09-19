import { IsString } from 'class-validator';

export class ImageRemoveDto {
  @IsString()
  public_id: string;
}
