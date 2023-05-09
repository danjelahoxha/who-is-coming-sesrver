import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from '../schemas/schedule.schema';
import { CreateScheduleDto } from 'src/dto/CreateScheduleDto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>,
  ) {}

  // Other methods...

  async findAll(): Promise<any> {
    return this.scheduleModel
      .aggregate([
        {
          $group: {
            _id: {
              day: '$day',
              month: '$month',
              year: '$year',
            },
            schedules: {
              $push: {
                userId: '$userId',
                startHour: '$startHour',
                endHour: '$endHour',
              },
            },
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'schedules.userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $project: {
            _id: 0,
            day: '$_id.day',
            month: '$_id.month',
            year: '$_id.year',
            schedules: 1,
            userDetails: 1,
          },
        },
      ])
      .exec();
  }

  async findOne(day: number, month: number, year: number): Promise<Schedule[]> {
    const schedules = await this.scheduleModel
      .find({
        day,
        month,
        year,
      })
      .populate('userId');

    return schedules;
  }

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const newSchedule = new this.scheduleModel(createScheduleDto);
    return newSchedule.save();
  }

  async update(id: string, schedule: Schedule): Promise<Schedule> {
    return this.scheduleModel
      .findByIdAndUpdate(id, schedule, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Schedule> {
    return this.scheduleModel.findByIdAndRemove(id).exec();
  }
}
