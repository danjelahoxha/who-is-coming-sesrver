import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateScheduleDto {
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsNotEmpty()
  day: number;

  @IsNotEmpty()
  month: number;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  startHour: string;

  @IsNotEmpty()
  endHour: string;
}
