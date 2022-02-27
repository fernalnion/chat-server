import { Document, LeanDocument } from 'mongoose';

export interface IUserBase {
  email: string;
  password: string;
  firstname: string;
  lastname?: string;
  dob?: Date;
  gender: string;
  status: number;
  active: boolean;
}

export interface IUser extends Document {
  email: string;
  password: string;
  firstname: string;
  lastname?: string;
  dob?: Date;
  gender: string;
  status: number;
  active: boolean;
}

export interface IUserSanitized extends Document {
  email: string;
  firstname: string;
  lastname?: string;
  dob?: Date;
  gender: string;
  status: number;
  active: boolean;
}

export interface IUserLean extends LeanDocument<IUserSanitized> {}
