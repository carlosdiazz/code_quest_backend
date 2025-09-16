import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

export const CurrentUserOptional = createParamDecorator(
  (_: string, context: ExecutionContext): User | undefined => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    const user = req.dbUser as User;

    if (!user) {
      return undefined;
    }

    return user;
  },
);
