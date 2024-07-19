import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhonebookModule } from './phonebook/phonebook.module';

@Module({
  imports: [PhonebookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
