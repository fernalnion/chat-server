import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { GENDER } from 'src/enums/gender.enum';
import { ROLE } from 'src/enums/role.enum';

@Schema()
export class User {
  @Prop({ type: String, unique: true, index: true })
  username: string;

  @Prop({ type: String, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  firstname: string;

  @Prop({ type: String })
  lastname?: string | undefined;

  @Prop({ type: String })
  phone?: string | undefined;

  @Prop({ type: Date })
  dob?: Date | undefined;

  @Prop({ enum: GENDER })
  gender?: string | undefined;

  @Prop({ type: Boolean, default: false })
  active: boolean;

  @Prop({ enum: ROLE, default: ROLE.User, required: true })
  role: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

// virtual function
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await hash(this['password'], 10);
    this['password'] = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});
