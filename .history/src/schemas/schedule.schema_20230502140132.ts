import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type ScheduleDocument = Schedule & Document;

@Schema()
export class Schedule {
  @Prop({ type: User, ref: 'User', required: true })
  userId: User;

  @Prop({ required: true })
  day: number;

  @Prop({ required: true })
  month: number;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  startHour: string;

  @Prop({ required: true })
  endHour: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
