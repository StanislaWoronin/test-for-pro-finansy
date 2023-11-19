import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { authEndpoint } from '../../common/constants/endpoints/auth.endpoint';
import {
  ApiMe,
  ApiRegistration,
} from '../../common/documentations/auth-decorators';
import { RegistrationDto } from './dto/registration.dto';
import { LoginCommand, RegistrationCommand } from './commands';
import { CheckCredentialGuard } from '../../common/guards/check-credential.guard';
import { ApiLogin } from '../../common/documentations/auth-decorators/login.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { LoginDto } from './dto/login.dto';
import { Metadata } from '../../common/decorators/metadata.decorator';
import { TCreatedTokens } from '../../common/shared/types/created-token.type';
import { MeView } from './views/me.view';
import { BearerGuard } from '../../common/guards/bearer.guard';
import { GetInfoAboutMeQuery } from './queries';

@Controller(authEndpoint.default)
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(authEndpoint.login)
  @UseGuards(CheckCredentialGuard)
  @ApiLogin()
  async login(
    @CurrentUser() userId: string,
    @Body() dto: LoginDto,
    @Metadata() browser: string,
  ): Promise<TCreatedTokens> {
    return await this.commandBus.execute(
      new LoginCommand({ browser, id: userId }),
    );
  }

  @Post(authEndpoint.registration)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiRegistration()
  async registration(@Body() dto: RegistrationDto): Promise<void> {
    return await this.commandBus.execute<RegistrationCommand, void>(
      new RegistrationCommand(dto),
    );
  }

  @Get(authEndpoint.me)
  @UseGuards(BearerGuard)
  @ApiMe()
  async getInfoAboutMe(@CurrentUser() userId: string): Promise<MeView> {
    return await this.queryBus.execute(new GetInfoAboutMeQuery(userId));
  }
}
