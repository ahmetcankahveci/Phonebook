import { Module } from '@nestjs/common';
import { PhonebookController } from './phonebook.controller';
import { PhonebookService } from './phonebook.service';

@Module({
  controllers: [PhonebookController],
  providers: [PhonebookService],
})
export class PhonebookModule {}
