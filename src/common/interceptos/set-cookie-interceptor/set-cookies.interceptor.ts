import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response } from 'express';
import { LoginView } from '../../../modules/auth/views';

@Injectable()
export class SetCookiesInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<LoginView> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap((result) => {
        if (result && result.refreshToken) {
          response.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 15 * 60 * 60 * 1000,
            sameSite: 'none',
          });
          delete result.refreshToken;
        }
      }),
    );
  }
}
