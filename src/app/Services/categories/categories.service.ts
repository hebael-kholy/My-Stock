import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private myHttp: HttpClient) {}

  getAllCategories() {
    return this.myHttp.get(
      'https://ecommerceiti-heba.onrender.com/category?limit=100'
    );
  }

  addCategory(data: any) {
    return this.myHttp.post(
      'https://ecommerceiti-heba.onrender.com/category',
      data
    );
  }

  updateCategory(categoryName: any, data: any) {
    return this.myHttp.put(
      'https://ecommerceiti-heba.onrender.com/category/' + categoryName,
      data
    );
  }

  updateImage(categoryId: any, data: any) {
    return this.myHttp.put(
      'https://ecommerceiti-heba.onrender.com/category/images/' + categoryId,
      data
    );
  }

  deleteCategory(categoryName: any) {
    return this.myHttp.delete(
      'https://ecommerceiti-heba.onrender.com/category/' + categoryName
    );
  }
}
