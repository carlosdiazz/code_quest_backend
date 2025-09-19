import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nest-lab/fastify-multer';
import type { File } from '@nest-lab/fastify-multer';

import { ImageService } from './image.service';
import { ResponsePropio } from '../../common';
import { AuthHttpGuard, CurrentUserHttp, Role, User } from '../auth';

@Controller('upload')
@UseGuards(AuthHttpGuard)
export class ImageController {
  constructor(private readonly imageSercive: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @CurrentUserHttp(Role.ADMIN) user: User,
    @UploadedFile() file: File,
  ): Promise<ResponsePropio> {
    const buffer = file.buffer;

    if (!buffer) {
      throw new BadRequestException('No vino la imagen');
    }

    const url = await this.imageSercive.uploadFile(buffer);

    return {
      message: url,
      statusCode: 200,
    };
  }
}
