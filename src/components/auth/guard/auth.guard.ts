// src/auth/firebase-auth.guard.graphql.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { admin } from 'src/firebase/fireabse-admin';
import { UserService } from '../user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req;

    const authHeader = req.headers.authorization as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No se proporcionó el token');
    }

    const idToken = authHeader.split('Bearer ')[1];
    //console.log(`TOKEN => ${idToken}`);

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      req.user = decodedToken;
      //console.log(decodedToken);

      const dbUser =
        await this.userService.findOrCreateFromFirebase(decodedToken);

      req.dbUser = dbUser;

      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
