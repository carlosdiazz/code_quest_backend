import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

import type { File } from '@nest-lab/fastify-multer';

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  transform(file: File): File {
    if (!file) {
      throw new BadRequestException('Debe subir un archivo');
    }

    if (!file.mimetype.match(/^image\/(jpg|jpeg|png)$/)) {
      throw new BadRequestException(
        'Solo se permiten archivos .jpg, .jpeg o .png',
      );
    }

    const new_size = file?.size ?? 0;
    if (new_size > 2 * 1024 * 1024) {
      throw new BadRequestException('El archivo no puede superar los 2MB');
    }

    return file;
  }
}
