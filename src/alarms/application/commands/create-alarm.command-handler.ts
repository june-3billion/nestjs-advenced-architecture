import { Logger } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmFactory } from "src/alarms/domain/factories/alarm.factory";

import { CreateAlarmCommand } from "./create-alarm.command";


@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand>{
    private readonly logger = new Logger(CreateAlarmCommandHandler.name);
    
    constructor(
        private readonly eventPublisher: EventPublisher,
        private readonly alarmFactory: AlarmFactory,
    ) {}


    async execute(command: CreateAlarmCommand): Promise<Alarm> {
        this.logger.debug(
            `Processing "CreateAlarmCommand" : ${JSON.stringify(command)}`
        );
        const alarm = this.alarmFactory.create(
            command.name, 
            command.severity, 
            command.triggeredAt, 
            command.items
        );
        this.eventPublisher.mergeObjectContext(alarm);
        alarm.commit();

        return alarm;
    }
}