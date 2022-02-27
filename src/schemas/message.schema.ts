import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Group } from './group.schema';
import { User } from './user.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userid: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Group' })
  groupid: Group;

  @Prop({ required: true, minlength: 1 })
  message: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  receivedby: User[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  readdby: User[];

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.index({ createdAt: -1, userid: 1 });
