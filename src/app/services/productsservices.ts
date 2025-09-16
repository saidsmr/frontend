import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';


@Injectable({
  providedIn: 'root'
})
export class Productsservices {
  
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http : HttpClient){}

    // GET all products
  getProducts(): Observable<Product[]>{
     return this.http.get<Product[]>(this.apiUrl)
  }
    // GET one product by id
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // POST create product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // PUT update product
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  // DELETE product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
