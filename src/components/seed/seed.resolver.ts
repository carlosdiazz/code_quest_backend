import { Query, Resolver } from '@nestjs/graphql';

import { SeedService } from './seed.service';

import { ResponsePropio } from '../../common';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Query(() => ResponsePropio, { name: 'execSeed' })
  public async execSeed(): Promise<ResponsePropio> {
    return await this.seedService.execSeed();
  }
}
