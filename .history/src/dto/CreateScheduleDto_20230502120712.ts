import { Types } from 'mongoose';

export class CreateScheduleDto {
  userIds: Types.ObjectId[];
  workdayIds: Types.ObjectId[];
}