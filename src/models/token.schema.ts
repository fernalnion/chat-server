import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tokentype: {
      type: String,
      required: true,
    },
    expirytime: {
      type: Date,
      default: Date.now(),
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
