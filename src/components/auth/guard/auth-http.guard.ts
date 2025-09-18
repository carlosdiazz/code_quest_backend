import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '../auth.service';
import { admin } from '../../../config';

@Injectable()
export class AuthHttpGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers['authorization'] as string | undefined;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No se proporcionó el token');
    }

    const idToken = authHeader.split('Bearer ')[1];

    try {
      // Verificar token con Firebase Admin
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
