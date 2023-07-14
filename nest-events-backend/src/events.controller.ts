import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";

@Controller('/events')
export class EventsController {

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return id;
  }

  @Post()
  create(@Body() input: object) {
    console.log(input);
    return input;
  }

  @Patch()
  update() {}

  @Delete()
  remove() {}
}