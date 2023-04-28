import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';
import { Workday } from './workday.schema';

@Schema()
export class Schedule extends Document {
  @Prop({ type: User, ref: 'User', required: true })
  userId: string;

  @Prop({ type: Workday, ref: 'Workday', required: true })
  workday: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
