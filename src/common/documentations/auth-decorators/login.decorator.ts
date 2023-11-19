import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from '../../../modules/auth/dto/login.dto';
import { settings } from '../../configurations/settings.config';
import { LoginView } from '../../../modules/auth/views';

export function ApiLogin() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({ summary: 'Логин' }),
    ApiBody({ type: LoginDto }),
    ApiCreatedResponse({
      description: `Вернет в "теле" accessToken, который заекспарится через ${settings.ttl.accessToken} и refreshToken в куки (${settings.ttl.refreshToken})`,
      type: LoginView,
    }),
    ApiUnauthorizedResponse({
      description:
        'Если авторизационный токен не передан или токен не валидный',
    }),
  );
}
