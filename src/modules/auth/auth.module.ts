import { Module } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repositories';
import { AuthQueryRepository } from './repositories/auth.query-repository';
import { AUTH_COMMAND_HANDLERS } from './commands';
import { AuthController } from './auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { setCookiesInterceptorProvider } from '../../common/interceptos/set-cookie-interceptor/set-cookies-interceptor.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './repositories/models/user.model';
import { SessionModel } from './repositories/models/session.model';
import { TokensFactory } from '../../common/factories/token.factory';
import { AUTH_QUERIES_HANDLERS } from './queries';

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({}),
    SequelizeModule.forFeature([SessionModel, UserModel]),
  ],
  controllers: [AuthController],
  providers: [
    AuthRepository,
    AuthQueryRepository,
    TokensFactory,
    setCookiesInterceptorProvider,
    ...AUTH_COMMAND_HANDLERS,
    ...AUTH_QUERIES_HANDLERS,
  ],
})
export class AuthModule {}
