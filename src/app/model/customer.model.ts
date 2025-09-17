// src/app/model/customer.model.ts
export interface Customer {
  id?: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
