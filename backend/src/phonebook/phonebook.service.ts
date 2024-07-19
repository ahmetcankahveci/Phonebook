import { Injectable } from '@nestjs/common';

@Injectable()
export class PhonebookService {
  private records: any[] = [
    { id: '1', name: 'Jon', surname: 'Snow', phoneNumber: '1234567890' },
    { id: '2', name: 'Cersie', surname: 'Lannister', phoneNumber: '0987654321' },
    { id: '3', name: 'Jaime', surname: 'Lannister', phoneNumber: '9876543210' },
    { id: '4', name: 'Arya', surname: 'Star', phoneNumber: '8765432101' },
    { id: '5', name: 'Daenerys', surname: 'Targaryen', phoneNumber: '7654321012' },
    
  ];

  findAll() {
    return this.records;
  }

  create(record: any) {
    this.records.push(record);
    return record;
  }

  update(id: string, updatedRecord: any) {
    const index = this.records.findIndex((record) => record.id === id);
    if (index !== -1) {
      this.records[index] = updatedRecord;
      return updatedRecord;
    }
    return null;
  }

  delete(id: string) {
    const index = this.records.findIndex((record) => record.id === id);
    if (index !== -1) {
      const deletedRecord = this.records[index];
      this.records.splice(index, 1);
      return deletedRecord;
    }
    return null;
  }
}
