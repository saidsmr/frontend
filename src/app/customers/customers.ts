// src/app/customers/customers.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class Customers implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = { firstName: '', lastName: '' };
  selectedCustomer?: Customer;
  loading = false;
  errorMsg = '';

  constructor(private service: CustomerService) {
     this.loadAll();
  }

  ngOnInit(): void {

  }

  loadAll(): void {
    this.loading = true;
    this.service.getAll().subscribe({
      next: (data) => {
        console.log('customers received', data);
        this.customers = data;
        
        this.loading = false;
      },
      error: (err) => {
        console.error('error loading customers', err);
        this.errorMsg = 'Erreur lors du chargement des clients';
        this.loading = false;
      }
    });
  }

  add(): void {
    if (!this.newCustomer.firstName || !this.newCustomer.lastName) return;
    this.service.create(this.newCustomer).subscribe({
      next: () => {
        this.newCustomer = { firstName: '', lastName: '' };
        this.loadAll();
      },
      error: (err) => console.error('create error', err)
    });
  }

  edit(c: Customer): void {
    this.selectedCustomer = { ...c };
  }

  update(): void {
    if (!this.selectedCustomer) return;
    this.service.update(this.selectedCustomer).subscribe({
      next: () => {
        this.selectedCustomer = undefined;
        this.loadAll();
      },
      error: (err) => console.error('update error', err)
    });
  }

  cancelEdit(): void {
    this.selectedCustomer = undefined;
  }

  delete(id?: number): void {
    if (!id) return;
    if (!confirm('Supprimer ce client ?')) return;
    this.service.delete(id).subscribe({
      next: () => this.loadAll(),
      error: (err) => console.error('delete error', err)
    });
  }
}
