import { PhonebookService } from './phonebook.service';
export declare class PhonebookController {
    private readonly phonebookService;
    constructor(phonebookService: PhonebookService);
    findAll(): any[];
    create(record: any): any;
    update(id: string, record: any): any;
    delete(id: string): any;
}
