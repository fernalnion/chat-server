import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Group } from 'src/schemas';

@Injectable()
export class GroupBusiness {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  createGroup = (payload: Group) => this.groupModel.create(payload);
  getGroup = (groupid: string) =>
    this.groupModel.findById(new ObjectId(groupid));
  getGroups = (userid: string) =>
    this.groupModel.find({ users: { $in: [new ObjectId(userid)] } });
  deleteGroup = (groupid: string) =>
    this.groupModel.findByIdAndDelete(new ObjectId(groupid));
  updateGroup = (groupid: string, group: Partial<Group>) =>
    this.groupModel.findByIdAndUpdate(new ObjectId(groupid), { $set: group });
}
