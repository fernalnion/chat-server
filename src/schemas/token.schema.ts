import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userid: User;

  @Prop({ required: true })
  tokentype: string;

  @Prop({ required: true, default: Date.now() })
  expirytime: Date;

  @Prop({ required: true, default: true })
  active: boolean;
}

@Schema()
export class LoginToken {
  @Prop()
  accessToken: string;

  @Prop()
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
