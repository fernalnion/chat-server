import { Document } from 'mongoose';
export interface IToken extends Document {
  token: string;
  userid: string;
  tokentype: string;
  expirytime: Date;
  active: boolean;
}

export interface ILoginToken {
  accessToken: string;
  refreshToken: string;
}
