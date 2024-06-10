import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';
export declare class EventsController {
    private events;
    findAll(): Event[];
    findOne(id: string): Event;
    create(input: CreateEventDto): {
        when: Date;
        id: number;
        name: string;
        description: string;
        address: string;
    };
    update(id: string, input: UpdateEventDto): Event;
    remove(id: string): void;
}
