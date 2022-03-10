import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TOKENTYPE } from 'src/enums/tokentype.enum';
import {
  ILoginToken,
  Token,
  ITokenBody,
  ITokenBodyBase,
  TokenDocument,
} from 'src/types/token.type';
import { ObjectId } from 'mongodb';
import { DateTime } from 'luxon';
import { sign, verify } from 'jsonwebtoken';
import { Config } from 'src/config';
import { User } from 'src/types/user.type';
import { v4 as uuid4 } from 'uuid';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<TokenDocument>,
  ) {}

  private deleteToken = (userid: string, tokentype: TOKENTYPE): any =>
    this.tokenModel.deleteMany({
      $and: [{ user: new ObjectId(userid) }, { tokentype }],
    });

  private createToken = (
    expirytime: number,
    payload: ITokenBody | ITokenBodyBase,
    secret: string,
  ) => {
    const expiryDate = DateTime.now().plus({ minutes: expirytime });
    const tokenpaylaod = {
      ...payload,
      iat: DateTime.now().toSeconds(),
      exp: expiryDate.toSeconds(),
    };

    return sign(tokenpaylaod, secret);
  };

  clearAccessToken = (userid: string) =>
    this.deleteToken(userid, TOKENTYPE.ACCESS);
  clearRefreshToken = (userid: string) =>
    this.deleteToken(userid, TOKENTYPE.REFRESH);

  saveToken = async (token: string, userid: string, tokentype: TOKENTYPE) => {
    await this.deleteToken(userid, tokentype);
    return this.tokenModel.create({
      token,
      user: new ObjectId(userid),
      tokentype,
      expirytime: DateTime.now(),
    });
  };

  verifyToken = (
    payload: string,
  ): Promise<ITokenBody | ITokenBodyBase | null> =>
    new Promise((resolve) => {
      verify(
        payload,
        Config.CHAT_SERVER_JWT_SECRET,
        async (err, decoded: any) => {
          if (err || !decoded) {
            resolve(null);
          } else {
            const token = await this.tokenModel.findOne({
              token: decoded?.jti,
            });
            if (!token) {
              resolve(null);
            }
            resolve(decoded);
          }
        },
      );
    });

  createAuthToken = async (user: User & { _id: any }): Promise<ILoginToken> => {
    // remove old tokens
    await this.clearRefreshToken(user._id);
    await this.clearAccessToken(user._id);

    // create access toke
    const accessPayload: ITokenBody = {
      username: user.username,
      email: user.email,
      role: user.role,
      expirytime: DateTime.now().toJSDate(),
      sub: user._id,
      tokenclaim: TOKENTYPE.ACCESS,
      jti: uuid4(),
    };
    const accessToken = this.createToken(
      Config.CHAT_SERVER_JWT_EXPIRE_IN_MINUTE,
      accessPayload,
      Config.CHAT_SERVER_JWT_SECRET,
    );
    await this.saveToken(accessPayload.jti, user._id, TOKENTYPE.ACCESS);

    // create access toke
    const refreshPayload: ITokenBodyBase = {
      expirytime: DateTime.now().toJSDate(),
      sub: user._id,
      tokenclaim: TOKENTYPE.REFRESH,
      jti: uuid4(),
    };
    const refreshToken = this.createToken(
      Config.CHAT_SERVER_JWT_EXPIRE_IN_MINUTE,
      refreshPayload,
      Config.CHAT_SERVER_JWT_SECRET,
    );
    await this.saveToken(refreshPayload.jti, user._id, TOKENTYPE.REFRESH);

    return {
      accessToken,
      refreshToken,
    };
  };
}
