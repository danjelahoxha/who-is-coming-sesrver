import { Controller, Get, Post, Body, Put, Param, Delete, BadRequestException } from '@nestjs/common';
import { ScheduleService } from '../services/schedule.service';
import { Schedule } from '../schemas/schedule.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';


@Controller('schedules')
export class ScheduleController {
  // constructor(private readonly scheduleService: ScheduleService) {}
  constructor(private readonly scheduleService: ScheduleService,
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
  ) {}


  @Post()
  async create(@Body() schedule: Schedule): Promise<Schedule> {
    return this.scheduleService.create(schedule);
  }

  @Get()
  async findAll(): Promise<any[]> {
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
    ]).exec();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Schedule> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid id parameter');
    }
    return this.scheduleService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() schedule: Schedule): Promise<Schedule> {
    return this.scheduleService.update(id, schedule);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Schedule> {
    return this.scheduleService.delete(id);
  }
}
