import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string
    email: string;
    favoritePeople: string[];
    schedule: IWorkday[];
}