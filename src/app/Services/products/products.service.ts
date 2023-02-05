import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public myClient: HttpClient) {}

  getAllProducts() {
    return this.myClient.get('https://fakestoreapi.com/products');
  }
}
