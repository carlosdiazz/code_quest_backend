import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponsePropio } from 'src/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  public get(): ResponsePropio {
    return this.appService.healthcheck();
  }

  @Get('healthcheck')
  public healthcheck(): ResponsePropio {
    return this.appService.healthcheck();
  }
}
