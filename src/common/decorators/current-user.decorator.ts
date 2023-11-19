import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TCurrentUser } from '../shared/types/current-user.type';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): TCurrentUser | null => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.userId) {
      return null;
    }

    return request.userId;
  },
);
