import { Document } from 'mongoose';

export interface IWorkday extends Document {
    dayOfWeek: string;
    hours: string;
}