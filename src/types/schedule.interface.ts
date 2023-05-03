import { Document } from 'mongoose';

export interface ISchedule extends Document {
  userId: string;
  workday: string;
}