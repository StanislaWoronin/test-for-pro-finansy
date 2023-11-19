import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TCreatedTokens } from '../shared/types/created-token.type';
import { TokenTypeEnum } from '../shared/enums/tokens.enum';
import { environmentConstant } from '../constants/environment.constant';
import { settings } from '../configurations/settings.config';

@Injectable()
export class TokensFactory {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getPairTokens(userId: string): Promise<TCreatedTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateToken(userId, TokenTypeEnum.AccessToken),
      this.generateToken(userId, TokenTypeEnum.RefreshToken),
    ]);
    return { accessToken, refreshToken };
  }

  private generateToken(
    userId: string,
    tokenType: TokenTypeEnum,
  ): Promise<string> {
    return this.jwtService.signAsync(
      {
        userId,
      },
      {
        secret: this.configService.get(environmentConstant.secret[tokenType]),
        expiresIn: settings.ttl[tokenType],
      },
    );
  }
}
