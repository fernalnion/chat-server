import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { Group, GroupUser } from 'src/schemas';

@Injectable()
export class GroupUserBusiness {
  constructor(
    @InjectModel(GroupUser.name) private groupuserModel: Model<GroupUser>,
  ) {}

  createGroupUser = (payload: Group) =>
    this.groupuserModel.create(payload);
  getGroupUsers = (groupid: string) =>
    this.groupuserModel.find({ groupid: new ObjectId(groupid) });
  deleteGroupUser = (groupid: string, userid: string) =>
    this.groupuserModel.findOneAndDelete({
      groupid: new ObjectId(groupid),
      userid: new ObjectId(userid),
    });
}
