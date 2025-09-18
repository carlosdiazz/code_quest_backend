import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../components';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req;

    const user = req.dbUser as User;

    if (!user) {
      throw new Error('No se encontró el usuario en la solicitud');
    }

    return user;
  },
);
