import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from '../schemas/schedule.schema';
import { CreateScheduleDto } from 'src/dto/CreateScheduleDto';

@Injectable()
export class ScheduleService {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<Schedule>) {}

  

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const createdSchedule = new this.scheduleModel(createScheduleDto);
    return createdSchedule.save();
  }

  return this.scheduleModel.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $lookup: {
        from: 'workdays',
        localField: 'workday',
        foreignField: '_id',
        as: 'workdayData',
      },
    },
    {
      $unwind: '$workdayData',
    },
    {
      $group: {
        _id: '$workday',
        workdayDate: { $first: '$workdayData.date' },
        workdayHours: { $first: '$workdayData.hours' },
        users: {
          $push: {
            userId: '$userId',
            userName: '$user.name',
            userEmail: '$user.email',
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        workdayId: '$_id',
        date: '$workdayDate',
        hours: '$workdayHours',
        users: 1,
      },
    },
  ]).exec();

  async findOne(id: string): Promise<Schedule> {
    return this.scheduleModel.findById(id).exec();
  }

  async update(id: string, schedule: Schedule): Promise<Schedule> {
    return this.scheduleModel.findByIdAndUpdate(id, schedule, { new: true }).exec();
  }

  async delete(id: string): Promise<Schedule> {
    return this.scheduleModel.findByIdAndRemove(id).exec();
  }
}
