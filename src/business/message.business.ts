import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { IMessage, IMessageBase } from 'src/types/message';

@Injectable()
export class MessageBusiness {
  constructor(@InjectModel('Message') private messageModel: Model<IMessage>) {}

  createMessages = (payload: IMessageBase) => this.messageModel.create(payload);
  getMessages = (groupid: string, skip: number, limit: number) =>
    this.messageModel.find({ groupid }, {}, { skip, limit });
  deleteMessage = (messageid: string) =>
    this.messageModel.findByIdAndDelete(new ObjectId(messageid));
  updateMessage = (messageid: string, payload: IMessageBase) =>
    this.messageModel.findByIdAndUpdate(new ObjectId(messageid), {
      $addToSet: { receivedby: payload.receivedby, readdby: payload.readdby },
      ...(payload.message
        ? { $set: { message: payload.message, updatedAt: new Date() } }
        : {}),
    });
}
