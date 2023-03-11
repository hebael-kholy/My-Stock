import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  constructor(private myHttp: HttpClient) {}

  getAllCoupons() {
    return this.myHttp.get('https://ecommerceiti-heba.onrender.com/coupon');
  }

  addCoupon(data: any) {
    return this.myHttp.post(
      'https://ecommerceiti-heba.onrender.com/coupon',
      data
    );
  }

  updateCoupon(couponId: any, data: any) {
    return this.myHttp.put(
      'https://ecommerceiti-heba.onrender.com/coupon/' + couponId,
      data
    );
  }

  deleteCoupon(couponId: any) {
    return this.myHttp.delete(
      'https://ecommerceiti-heba.onrender.com/coupon/' + couponId
    );
  }
}
