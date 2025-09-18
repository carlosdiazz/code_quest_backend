import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthResolver, AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
