import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TotalService } from './total.service';

import { AuthGuard } from '../auth';
import { TotalResponse } from './total.response';

@Resolver()
@UseGuards(AuthGuard)
export class TotalResolver {
  constructor(private readonly totalService: TotalService) {}

  @Query(() => TotalResponse, { name: 'totalResponse' })
  public async totalResponse(): Promise<TotalResponse> {
    return await this.totalService.totalResponse();
  }
}
