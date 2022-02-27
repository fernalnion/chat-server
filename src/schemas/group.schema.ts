import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema()
export class Group {
  @Prop({ required: true })
  groupname: string;

  @Prop({ required: true, default: true })
  isgroup: boolean;

  @Prop({ required: true, default: true })
  active: boolean;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
