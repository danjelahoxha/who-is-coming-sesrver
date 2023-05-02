import { Document } from 'mongoose';
import { ISchedule } from './schedule.interface';

export interface IUser extends Document {
    name: string
    email: string;
    favoritePeople: string[];
    schedule: ISchedule[];
}