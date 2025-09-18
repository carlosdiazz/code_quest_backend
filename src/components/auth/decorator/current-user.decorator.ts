import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role, User } from '../entities/user.entity';

export const CurrentUser = createParamDecorator(
  (role: string, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const user = req.dbUser as User;

    if (!user) {
      throw new InternalServerErrorException(
        'No se encontró el usuario en la solicitud',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (role === Role.ADMIN && user.role != Role.ADMIN) {
      throw new UnauthorizedException('No tiene el rol para esta accion');
    }

    return user;
  },
);

export const CurrentUserHttp = createParamDecorator(
  (role: string, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    const user: User = request.dbUser;
    if (!user) {
      throw new InternalServerErrorException(
        'No se encontró el usuario en la solicitud',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (role === Role.ADMIN && user.role != Role.ADMIN) {
      throw new UnauthorizedException('No tiene el rol para esta accion');
    }

    return user;
  },
);
