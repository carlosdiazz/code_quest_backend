import { BadGatewayException, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

import { envs } from 'src/config';

@Injectable()
export class ImageService {
  constructor() {
    cloudinary.config({
      cloud_name: envs.CLOUD_DINARY_NAME,
      api_key: envs.CLOUD_DINARY_API_KEY,
      api_secret: envs.CLOUD_DINARY_API_SECRET,
    });
  }

  async uploadFile(buffer: Buffer): Promise<string> {
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

      return result.secure_url;
    } catch (err) {
      throw new BadGatewayException(
        err.message || 'Error subiendo a Cloudinary',
      );
    }
  }
}
