import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Body, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { CreateEventDto } from './create-event.dto';
import { UpdateEventDto } from './update-event.dto';
import { Event } from './event.entity';

@Controller('/events')
export class EventsController {
  private events: Event[] = [];
  @Get()
  findAll(): Event[] {
    return this.events;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Event {
    return this.events.find((event) => event.id === parseInt(id));
  }
  @Post()
  create(@Body() input: CreateEventDto) {
    const event = {
      ...input,
      when: new Date(input.when),
      id: this.events.length + 1,
    };
    this.events.push(event);
    return event;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: UpdateEventDto) {
    const index = this.events.findIndex((event) => event.id === parseInt(id));
    this.events[index] = {
      ...this.events[index],
      ...input,
      when: input.when ? new Date(input.when) : this.events[index].when,
    };
    return this.events[index];
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.events = this.events.filter((event) => event.id !== parseInt(id));
  }
}
