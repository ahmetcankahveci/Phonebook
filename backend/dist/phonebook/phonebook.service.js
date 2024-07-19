"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhonebookService = void 0;
const common_1 = require("@nestjs/common");
let PhonebookService = class PhonebookService {
    constructor() {
        this.records = [
            { id: '1', name: 'John', surname: 'Doe', phoneNumber: '1234567890' },
            { id: '2', name: 'Jane', surname: 'Doe', phoneNumber: '0987654321' },
        ];
    }
    findAll() {
        return this.records;
    }
    create(record) {
        this.records.push(record);
        return record;
    }
    update(id, updatedRecord) {
        const index = this.records.findIndex((record) => record.id === id);
        if (index !== -1) {
            this.records[index] = updatedRecord;
            return updatedRecord;
        }
        return null;
    }
    delete(id) {
        const index = this.records.findIndex((record) => record.id === id);
        if (index !== -1) {
            const deletedRecord = this.records[index];
            this.records.splice(index, 1);
            return deletedRecord;
        }
        return null;
    }
};
exports.PhonebookService = PhonebookService;
exports.PhonebookService = PhonebookService = __decorate([
    (0, common_1.Injectable)()
], PhonebookService);
//# sourceMappingURL=phonebook.service.js.map