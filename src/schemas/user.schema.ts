import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { USER_STATUS } from 'src/enum/userstatus';

export type UserBaseDocument = UserBase & Document;
export type UserDocument = User & Document;

@Schema()
export class Login {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

@Schema()
export class UserBase {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  dob?: Date;

  @Prop({ required: true, enum: ['male', 'female', 'others'] })
  gender: string;

  @Prop({ required: true, enum: USER_STATUS, default: USER_STATUS.OFFLINE })
  status: number;

  @Prop({ required: true, default: false })
  active: boolean;
}
@Schema()
export class User extends UserBase {
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next: any) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
