import * as process from 'process';
import { environmentConstant } from '../constants/environment.constant';

export const settings = {
  ttl: {
    accessToken: process.env[environmentConstant.ttl.accessToken] ?? '15 min',
    refreshToken: process.env[environmentConstant.ttl.accessToken] ?? '15 day',
  },
};
