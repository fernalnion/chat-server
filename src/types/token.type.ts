import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TOKENTYPE } from 'src/enums/tokentype.enum';
import * as mongoose from 'mongoose';
import { User } from './user.type';

@Schema()
export class Token {
  @Prop({ enum: TOKENTYPE, required: true })
  tokentype: string;

  @Prop({ type: String, required: true })
  token: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Date, required: true })
  expirytime: Date;
}

export type TokenDocument = Token & Document;
export const TokenSchema = SchemaFactory.createForClass(Token);

export interface ITokenBodyBase {
  expirytime: Date;
  sub: string;
  tokenclaim: string;
  jti: string;
}

export interface ITokenBody extends ITokenBodyBase {
  username: string;
  email: string;
  role: number;
}

export interface ILoginToken {
  accessToken: string;
  refreshToken: string;
}
