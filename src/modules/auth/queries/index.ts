import { IQueryHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';
import { GetInfoAboutMeQueryHandler } from './get-info-about-me.query-handler';

export * from './get-info-about-me.query-handler';

export const AUTH_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
  GetInfoAboutMeQueryHandler,
];
