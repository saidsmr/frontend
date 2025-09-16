import { Routes } from '@angular/router';
import { Products } from './products/products';  
import { Customers } from './customers/customers'; 

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' }, 
  { path: 'products', component: Products },
  { path: 'customers', component: Customers }
];
