import { AutowiredEvent } from "src/shared/infrastructure/event-store/decorators/autowired-event.decorator";
import { Alarm } from "../alarm";

@AutowiredEvent
export class AlarmCreatedEvent {
    constructor(readonly alarm: Alarm) {}
}