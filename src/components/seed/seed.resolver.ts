import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { SeedService } from './seed.service';

import { ResponsePropio } from '../../common';
import { AuthGuard, CurrentUser, Role, User } from '../auth';

@Resolver()
@UseGuards(AuthGuard)
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Query(() => ResponsePropio, { name: 'execSeed' })
  public async execSeed(
    @CurrentUser(Role.ADMIN) user: User,
  ): Promise<ResponsePropio> {
    return await this.seedService.execSeed();
  }
}
