import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema(
  {
    groupname: {
      type: String,
      required: true,
    },
    isgroup: {
      type: Boolean,
      default: true,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
