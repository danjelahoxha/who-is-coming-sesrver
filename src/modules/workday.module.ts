import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Workday, WorkdaySchema } from '../schemas/workday.schema';
import { WorkdayController } from '../controllers/workday.controller';
import { WorkdayService } from '../services/workday.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Workday.name, schema: WorkdaySchema }])],
  controllers: [WorkdayController],
 providers: [WorkdayService],
})
export class WorkdayModule {}

