import axiosClient from './axiosClient';
import { PhonebookRecord } from '../types/PhonebookRecord';

export const getPhonebook = async (): Promise<PhonebookRecord[]> => {
  const response = await axiosClient.get<PhonebookRecord[]>('/');
  return response.data;
};

export const createRecord = async (record: PhonebookRecord): Promise<PhonebookRecord> => {
  const response = await axiosClient.post<PhonebookRecord>('/', record);
  return response.data;
};

export const updateRecord = async (id: number, record: PhonebookRecord): Promise<PhonebookRecord> => {
  const response = await axiosClient.put<PhonebookRecord>(`/${id}`, record);
  return response.data;
};

export const deleteRecord = async (id: number): Promise<void> => {
  const response = await axiosClient.delete<void>(`/${id}`);
  return response.data;
};
