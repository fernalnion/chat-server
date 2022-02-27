import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Group } from './group.schema';
import { User } from './user.schema';

export type GroupUserDocument = GroupUser & Document;

@Schema()
export class GroupUser {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Group', index: true })
  groupid: Group;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', index: true })
  userid: User;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const GroupUserSchema = SchemaFactory.createForClass(GroupUser);
