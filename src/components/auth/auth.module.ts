import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuardPublic } from './guard/auth-public.guard';
import { AuthHttpGuard } from './guard/auth-http.guard';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    AuthResolver,
    AuthService,
    AuthGuard,
    AuthGuardPublic,
    AuthHttpGuard,
  ],
  exports: [AuthService, AuthGuard, AuthHttpGuard],
})
export class AuthModule {}
