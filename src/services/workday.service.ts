import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workday } from '../schemas/workday.schema';

@Injectable()
export class WorkdayService {
  constructor(@InjectModel(Workday.name) private workdayModel: Model<Workday>) {}

  async create(workday: Workday): Promise<Workday> {
    const newWorkday = new this.workdayModel(workday);
    return newWorkday.save();
  }

  async findAll(): Promise<Workday[]> {
    return this.workdayModel.find().exec();
  }

  async findOne(id: string): Promise<Workday> {
    return this.workdayModel.findById(id).exec();
  }

  async update(id: string, workday: Workday): Promise<Workday> {
    return this.workdayModel.findByIdAndUpdate(id, workday, { new: true }).exec();
  }

  async delete(id: string): Promise<Workday> {
    return this.workdayModel.findByIdAndRemove(id).exec();
  }
}
