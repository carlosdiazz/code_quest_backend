import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostViewService } from './post-view.service';
import { PostView } from './entities/post-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostView])],
  providers: [PostViewService],
  exports: [PostViewService],
})
export class PostViewModule {}
