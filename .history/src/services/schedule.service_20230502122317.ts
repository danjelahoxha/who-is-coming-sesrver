import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule } from '../schemas/schedule.schema';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
  ) {}
  

  async create(schedule: Schedule): Promise<Schedule> {
    const newSchedule = new this.scheduleModel(schedule);
    return newSchedule.save();
  }

  async findAll(): Promise<Schedule[]> {
    return this.scheduleModel.find().exec();
  }

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
