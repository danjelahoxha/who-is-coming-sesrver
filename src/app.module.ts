import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { ScheduleModule } from './modules/schedule.module';
import { WorkdayModule } from './modules/workday.module';


 MongooseModule.forRoot('mongodb://localhost:27017/whoiscoming', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/whoiscomming'),
    UserModule,
    ScheduleModule,
    WorkdayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
