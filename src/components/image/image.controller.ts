import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nest-lab/fastify-multer';
import type { File } from '@nest-lab/fastify-multer';

import { ImageRemoveDto } from './dto/image-remove.dto';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import { ImageValidationPipe } from './image.pipe';

import { AuthHttpGuard, CurrentUserHttp, Role, User } from '../auth';
import { ResponsePropio } from '../../common';

@Controller('upload')
@UseGuards(AuthHttpGuard)
export class ImageController {
  constructor(private readonly imageSercive: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file-imagen'))
  public async uploadFile(
    @CurrentUserHttp(Role.ADMIN) user: User,
    @UploadedFile(ImageValidationPipe) file: File,
  ): Promise<Image> {
    const buffer = file.buffer;

    if (!buffer) throw new BadRequestException('No vino la imagen');

    return await this.imageSercive.create(buffer);
  }

  @Delete()
  public async remove(
    @Body() imageRemoveDto: ImageRemoveDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUserHttp(Role.ADMIN) user: User,
  ): Promise<ResponsePropio> {
    return await this.imageSercive.remove(imageRemoveDto);
  }
}
