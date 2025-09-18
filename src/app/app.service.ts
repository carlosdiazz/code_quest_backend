import { Injectable } from '@nestjs/common';
import { ResponsePropio } from '../common';

@Injectable()
export class AppService {
  public healthcheck(): ResponsePropio {
    return {
      message: 'OK',
      statusCode: 200,
    };
  }
}
