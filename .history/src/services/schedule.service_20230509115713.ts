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
    // Construct a start date and an end date to search for schedules
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day + 1, 0, 0, 0);

    // Find all schedules within the specified date range
    const schedules = await this.scheduleModel
      .find({ 'workday.date': { $gte: startDate, $lt: endDate } })
      .populate('userId', 'name')
      .exec();

    // Create a map of user IDs to their schedules
    const userSchedules = new Map<string, { name: string; times: string[] }>();
    schedules.forEach((schedule) => {
      const userId = schedule.userId._id.toString();
      const userName = schedule.userId.name;
      const workday = schedule.workday.date.toISOString().substr(11, 5);
      if (!userSchedules.has(userId)) {
        userSchedules.set(userId, { name: userName, times: [] });
      }
      userSchedules.get(userId).times.push(workday);
    });

    // Convert the map to an array of user schedules
    const result = Array.from(userSchedules, ([userId, data]) => ({
      userId,
      ...data,
    }));

    return result;
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
