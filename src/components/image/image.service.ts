import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Image } from './entities/image.entity';
import { envs } from '../../config';

import { MESSAGE, ResponsePropio } from '../../common';
import { ImageRemoveDto } from './dto/image-remove.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly repository: Repository<Image>,
  ) {
    cloudinary.config({
      cloud_name: envs.CLOUD_DINARY_NAME,
      api_key: envs.CLOUD_DINARY_API_KEY,
      api_secret: envs.CLOUD_DINARY_API_SECRET,
    });
  }

  public async create(buffer: Buffer): Promise<Image> {
    const file = await this.uploadFile(buffer);

    try {
      const newEntity = this.repository.create({
        public_id: file.public_id,
        secure_url: file.secure_url,
      });

      const entity = await this.repository.save(newEntity);

      return await this.findOne(entity.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  public async remove(imageRemoveDto: ImageRemoveDto): Promise<ResponsePropio> {
    const { public_id } = imageRemoveDto;
    return await this.removeImage(public_id);
  }

  public async findOne(id: number): Promise<Image> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Image`);
    }
    return entity;
  }

  private async uploadFile(buffer: Buffer): Promise<UploadApiResponse> {
    try {
      const result: UploadApiResponse = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'uploads' },
          (error, result) => {
            if (error) return reject(new Error(error.message));
            resolve(result as UploadApiResponse);
          },
        );
        uploadStream.end(buffer);
      });

      return result;
    } catch (err) {
      throw new BadGatewayException(
        err.message || 'Error subiendo a Cloudinary',
      );
    }
  }

  private async deleteFile(public_id: string): Promise<void> {
    await cloudinary.uploader.destroy(public_id);
  }

  private async removeImage(public_id: string): Promise<ResponsePropio> {
    const entity = await this.repository.findOneBy({ public_id });

    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Image`);
    }

    try {
      await this.deleteFile(public_id);
      await this.repository.remove(entity);

      return {
        message: 'Imagen eliminada correctamente',
        statusCode: 200,
      };
    } catch (error) {
      throw new UnprocessableEntityException(
        error?.message || 'Error eliminando la imagen',
      );
    }
  }
}
