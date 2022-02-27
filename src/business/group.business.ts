import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/types/user';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { IGroupBase } from 'src/types/group';

@Injectable()
export class GroupBusiness {
  constructor(@InjectModel('Group') private groupModel: Model<IUser>) {}

  createGroup = (payload: IGroupBase) => this.groupModel.create(payload);
  getGroup = (groupid: string) =>
    this.groupModel.findById(new ObjectId(groupid));
  getGroups = (userid: string) =>
    this.groupModel.find({ users: { $in: [new ObjectId(userid)] } });
  deleteGroup = (groupid: string) =>
    this.groupModel.findByIdAndDelete(new ObjectId(groupid));
  updateGroup = (groupid: string, group: Partial<IGroupBase>) =>
    this.groupModel.findByIdAndUpdate(new ObjectId(groupid), { $set: group });
}
