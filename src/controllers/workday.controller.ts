import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { WorkdayService } from '../services/workday.service';
import { Workday } from '../schemas/workday.schema';

@Controller('workdays')
export class WorkdayController {
  constructor(private readonly workdayService: WorkdayService) {}

  @Post()
  async create(@Body() workday: Workday): Promise<Workday> {
    return this.workdayService.create(workday);
  }

  @Get()
  async findAll(): Promise<Workday[]> {
    return this.workdayService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Workday> {
    return this.workdayService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() workday: Workday): Promise<Workday> {
    return this.workdayService.update(id, workday);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Workday> {
    return this.workdayService.delete(id);
  }
}
