import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(public myClient: HttpClient) {}

  
  getWishlistitems(id:any) {
    return this.myClient.get(`https://ecommerceiti-heba.onrender.com/wishlist/${id}`);
  }

  removeitemfromWishlist(id1:any,id2:any){
    return this.myClient.delete(`https://ecommerceiti-heba.onrender.com/wishlist/${id1}/${id2}`);
  }
}
