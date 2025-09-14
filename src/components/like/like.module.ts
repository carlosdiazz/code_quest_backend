import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { Like } from './entities/like.entity';
import { UserModule } from '../user';
import { PostModule } from '../post';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), PostModule, UserModule],
  providers: [LikeResolver, LikeService],
  exports: [LikeService],
})
export class LikeModule {}
