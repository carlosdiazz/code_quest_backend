// src/auth/firebase-auth.guard.graphql.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

import { admin } from 'src/config/firebase/fireabse-admin';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuardPublic implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const authHeader = req.headers.authorization as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return true;
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;

      const dbUser =
        await this.authService.findOrCreateFromFirebase(decodedToken);

      req.dbUser = dbUser;

      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
