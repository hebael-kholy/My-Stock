import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: any;
  BaseUrl = 'https://ecommerceiti-heba.onrender.com/product/?limit=100';
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(this.BaseUrl);
  }

  getTopProducts() {
    return this.http.get('https://ecommerceiti-heba.onrender.com/product/top');
  }

  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();

  //   formData.append('file', file);

  //   const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });

  //   return this.http.request(req);
  // }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }
  getAllCategories() {
    return this.http.get(
      'https://ecommerceiti-heba.onrender.com/category?limit=100'
    );
  }
  createProduct(item: any) {
    return this.http.post(
      'https://ecommerceiti-heba.onrender.com/product/createall',
      item
    );
  }
  deleteProduct(id: any) {
    return this.http.delete(
      `https://ecommerceiti-heba.onrender.com/product/${id}`
    );
  }
  editProduct(id: any, item: any) {
    return this.http.put(
      `https://ecommerceiti-heba.onrender.com/product/${id}`,
      item
    );
  }
  updateImage(id: any, data: any) {
    return this.http.put(
      `https://ecommerceiti-heba.onrender.com/product/image/${id}`,
      data
    );
  }
}
