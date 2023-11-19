import { Injectable } from '@nestjs/common';
import { environmentConstant } from '../../constants/environment.constant';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { models } from './models';

@Injectable()
export class SequelizeConfig implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const { configService } = this;

    return {
      dialect: 'postgres',
      host: configService.get(environmentConstant.db.host),
      port: Number(configService.get(environmentConstant.db.port)),
      username: configService.get(environmentConstant.db.user),
      password: configService.get(environmentConstant.db.password),
      database: configService.get(environmentConstant.db.name),
      models: [...models],
      autoLoadModels: true,
      //ssl: true,
    };
  }
}
