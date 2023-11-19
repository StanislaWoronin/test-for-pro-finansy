import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerEndpoint } from '../constants/endpoints/swagger.endpoint';

export const swaggerConfig = (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Authorization service')
    .setDescription('Test for ProFinansy')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions, {
    include: [],
  });
  SwaggerModule.setup(swaggerEndpoint, app, document);
};
