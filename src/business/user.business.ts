import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { omit } from 'lodash';
import { Model } from 'mongoose';
import { User, UserBase, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserBusiness {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  sanitizeUser = (user: UserDocument) => {
    const sanitized = user.toObject();
    return omit(sanitized, ['password', '__v', '_id']);
  };

  create = async (payload: UserBase) => {
    const createdUser = new this.userModel(payload);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  };

  getUser = (payload: Partial<User>) =>
    this.userModel.findOne({ email: payload.email });
  getUsers = () => this.userModel.find({});
}
