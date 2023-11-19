import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MeView } from '../../../modules/auth/views/me.view';

export function ApiMe() {
  return applyDecorators(
    ApiTags('Catalogs'),
    ApiOperation({
      summary: 'Можно получить информацию о своем профиле',
    }),
    ApiBearerAuth('jwt'),
    ApiOkResponse({
      description: 'Данные успешно получены',
      type: MeView,
    }),
    ApiUnauthorizedResponse({
      description:
        'Если авторизационный токен не передан или токен не валидный',
    }),
  );
}
