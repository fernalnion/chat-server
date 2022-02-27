import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

export const GroupUsersSchema = new mongoose.Schema({
  groupid: {
    type: ObjectId,
    required: true,
  },
  userid: {
    type: ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});
