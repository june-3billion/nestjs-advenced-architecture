import { DynamicModule, MiddlewareConsumer, Module, NestModule, Type } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/logger.middleware';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmsService } from './alarms.service';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';
import { GetAlarmsQueryHandler } from './quries/get-alarm.query-handler';

@Module({
  controllers: [AlarmsController],
  providers: [AlarmsService, AlarmFactory, CreateAlarmCommandHandler, GetAlarmsQueryHandler, AlarmCreatedEventHandler],
})
export class AlarmsModule implements NestModule {
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AlarmsController)
  }
  
  static withInfrastucture(infrastructureModule: Type | DynamicModule) { // 👈 new static method
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}