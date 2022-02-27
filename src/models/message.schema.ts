import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  userid: {
    type: ObjectId,
    required: true,
    index: true,
  },
  groupid: {
    type: ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  receivedby: {
    type: [ObjectId],
    default: [],
  },
  readdby: {
    type: [ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

MessageSchema.index({ createdAt: -1, groupid: 1 });
