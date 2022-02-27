import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as lodash from 'lodash';
import { Model } from 'mongoose';
import { ILogin } from 'src/types/login';
import { IPayload } from 'src/types/payload';
import { IUser, IUserBase } from 'src/types/user';

@Injectable()
export class UserBusiness {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  sanitizeUser = (user: IUser) => {
    const sanitized = user.toObject();
    return lodash.omit(sanitized, ['password', '__v', '_id']);
  };

  create = async (payload: IUserBase) => {
    const createdUser = new this.userModel(payload);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  };

  getUser = (payload: IPayload) =>
    this.userModel.findOne({ email: payload.email });
  getUsers = () => this.userModel.find({});
}
