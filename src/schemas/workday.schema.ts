import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkdayDocument = Workday & Document;

@Schema()
export class Workday {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  hours: string;
}

export const WorkdaySchema = SchemaFactory.createForClass(Workday);
