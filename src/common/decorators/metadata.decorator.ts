import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Metadata = createParamDecorator(
  (data: string, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();

    return request.headers['user-agent'];
  },
);
