import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { TOKEN_TYPES } from 'src/enum/toketypes';
import { Token } from 'src/schemas/token.schema';

@Injectable()
export class TokenBusiness {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}

  saveToken = (token: string, userid: string, tokentype: TOKEN_TYPES) =>
    this.tokenModel.create({ token, userid: new ObjectId(userid), tokentype });

  deactivateTokens = (userid: string, tokentype: TOKEN_TYPES) =>
    this.tokenModel.updateMany(
      { userid: new ObjectId(userid), tokentype },
      { $set: { active: false } },
    );

  getToken = (token: string) => this.tokenModel.findOne({ token });
}
