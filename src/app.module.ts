import { Module } from '@nestjs/common';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { FeaturesModule } from './modules/features.module';
import { DatabaseModule } from './common/providers/postgres/database.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
      ttl: 30000,
    }),
    FeaturesModule,
    DatabaseModule,
  ],
})
export class AppModule {}
