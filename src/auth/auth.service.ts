import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { TokenBusiness } from 'src/business/token.business';
import { Config } from 'src/config';
import { TOKEN_TYPES } from 'src/enum/toketypes';
import { User, UserBase } from 'src/schemas';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenBusiness: TokenBusiness,
  ) {}

  private generateToken = (
    payload: any,
    secret: string,
    expireTime: number,
  ) => {
    const newexpiry = DateTime.utc().plus({ minutes: expireTime }).toJSDate();
    const localPayload = {
      ...payload,
      iat: new Date().getTime() / 1000,
      exp: newexpiry.getTime() / 1000,
    };
    return sign(localPayload, secret);
  };

  private saveToken = async (
    token: string,
    userid: string,
    tokentype: TOKEN_TYPES,
  ) => {
    await this.tokenBusiness.deactivateTokens(userid, tokentype);
    return this.tokenBusiness.saveToken(token, userid, tokentype);
  };

  private deactivateTokens = (userid: string, tokentype: TOKEN_TYPES) =>
    this.tokenBusiness.deactivateTokens(userid, tokentype);

  deactivateRefreshToken = (userid: string) =>
    this.deactivateTokens(userid, TOKEN_TYPES.REFRESH_TOKEN);
  deactivateAccessToken = (userid: string) =>
    this.deactivateTokens(userid, TOKEN_TYPES.ACCESS_TOKEN);

  generateAuthToken = async (user: { id: string } & UserBase) => {
    const accessTokenPayload = {
      sub: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      tokenclaim: TOKEN_TYPES.ACCESS_TOKEN,
      expirytime: new Date(),
      jti: uuidv4(),
    };

    const accessToken = this.generateToken(
      accessTokenPayload,
      Config.APPLICATION_SECRET,
      Config.ACCESS_TOKEN_EXPIRES_IN_MINUTES,
    );

    const refteshTokenPayload = {
      sub: user.id,
      tokenclaim: TOKEN_TYPES.REFRESH_TOKEN,
      expirytime: new Date(),
      jti: uuidv4(),
    };

    const refreshToken = this.generateToken(
      refteshTokenPayload,
      Config.APPLICATION_SECRET,
      Config.REFRESH_TOKEN_EXPIRES_IN_MINUTES,
    );

    await this.saveToken(
      accessTokenPayload.jti,
      user.id,
      TOKEN_TYPES.ACCESS_TOKEN,
    );
    await this.saveToken(
      refteshTokenPayload.jti,
      user.id,
      TOKEN_TYPES.REFRESH_TOKEN,
    );

    return {
      accessToken,
      refreshToken,
    };
  };

  validateUser = (payload: User) => this.userService.getUser(payload);

  verifyToken = (token: string): Promise<any | null> =>
    new Promise((resolve) => {
      verify(
        token,
        Config.APPLICATION_SECRET,
        async (err: Error, decoded: any) => {
          const tokenDocument = await this.tokenBusiness.getToken(decoded?.jti);
          return resolve(tokenDocument ? decoded : null);
        },
      );
    });
}
