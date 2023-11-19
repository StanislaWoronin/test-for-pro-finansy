import { ICommandHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { RegistrationCommandHandler } from './registration.command-handler';
import { LoginCommandHandler } from './login.command-handler';

export * from './login.command-handler';
export * from './registration.command-handler';

export const AUTH_COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  LoginCommandHandler,
  RegistrationCommandHandler,
];
