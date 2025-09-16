import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Like } from './entities/like.entity';
import { AuthModule } from '../auth';
import { PostModule } from '../post';
import { LikePostResolver } from './like-post.resolver';
import { LikePostService } from './like-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), PostModule, AuthModule],
  providers: [LikePostResolver, LikePostService],
  exports: [LikePostService],
})
export class LikePostModule {}
