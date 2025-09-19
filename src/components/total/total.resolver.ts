import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { TotalService } from './total.service';
import { TotalResponse } from './total.response';

import { AuthGuard, CurrentUser, Role, User } from '../auth';

@Resolver()
@UseGuards(AuthGuard)
export class TotalResolver {
  constructor(private readonly totalService: TotalService) {}

  @Query(() => TotalResponse, { name: 'totalResponse' })
  public async totalResponse(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser(Role.ADMIN) user: User,
  ): Promise<TotalResponse> {
    return await this.totalService.totalResponse();
  }
}
