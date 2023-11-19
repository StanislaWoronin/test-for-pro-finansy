import { Provider } from '@nestjs/common';
import { SetCookiesInterceptor } from './set-cookies.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

export const setCookiesInterceptorProvider: Provider = {
  provide: APP_INTERCEPTOR,
  useClass: SetCookiesInterceptor,
};
