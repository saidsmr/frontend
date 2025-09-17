import { Component, NgModule, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { Productsservices } from '../services/productsservices';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],   
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})

export class Products implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', price: 0 };
  selectedProduct?: Product;

  constructor(private productsservices: Productsservices) {  this.loadProducts();}

  ngOnInit(): void {
  
  }

  loadProducts(): void {
     this.productsservices.getProducts().subscribe({
    next: (data) => {
     //  console.log("✅ Produits reçus :", data);
      this.products = data;
    },
    error: (err) => {
      console.error("❌ Erreur lors du chargement des produits :", err);
    }
  });
  
  }

  addProduct(): void {
    this.productsservices.createProduct(this.newProduct).subscribe(() => {
      this.newProduct = { name: '', price: 0 };
      this.loadProducts();
    });
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product };
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      this.productsservices.updateProduct(this.selectedProduct).subscribe(() => {
        this.selectedProduct = undefined;
        this.loadProducts();
      });
    }
  }

  deleteProduct(id: number): void {
    this.productsservices.deleteProduct(id).subscribe(() => this.loadProducts());
  }
}