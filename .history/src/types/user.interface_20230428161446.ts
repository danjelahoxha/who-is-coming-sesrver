import { Document } from 'mongoose';
import {IWorkday} from './workday.interface'

export interface IUser extends Document {
    name: string
    email: string;
    favoritePeople: string[];
    schedule: IWorkday[];
}