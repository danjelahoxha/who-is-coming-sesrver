import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
// import { User } from './user.schema';
// import { Workday } from './workday.schema';

@Schema()
export class Schedule extends Document {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  userIds: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Workday' }], required: true })
  workdayIds: Types.ObjectId[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
