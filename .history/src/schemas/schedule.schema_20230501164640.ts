import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Workday } from './workday.schema';

@Schema()
export class Schedule extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Workday', required: true })
  workday: Types.ObjectId;
}


export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
