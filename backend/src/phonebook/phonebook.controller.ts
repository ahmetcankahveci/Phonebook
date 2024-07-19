// phonebook.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { PhonebookService } from './phonebook.service';

@Controller('phonebook')
export class PhonebookController {
  constructor(private readonly phonebookService: PhonebookService) {}

  @Get()
  findAll() {
    return this.phonebookService.findAll();
  }

  @Post()
  create(@Body() record: any) {
    return this.phonebookService.create(record);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() record: any) {
    return this.phonebookService.update(id, record);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.phonebookService.delete(id);
  }
}
