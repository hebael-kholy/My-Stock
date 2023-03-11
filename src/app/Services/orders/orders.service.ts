import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private myHttp: HttpClient) {}

  getAllOrders(adminId: any) {
    return this.myHttp.get(
      'https://ecommerceiti-heba.onrender.com/order/admin/' + adminId
    );
  }

  getAllUsers() {
    return this.myHttp.get('https://ecommerceiti-heba.onrender.com/users');
  }

  getLastOrders(adminId: any) {
    return this.myHttp.get(
      'https://ecommerceiti-heba.onrender.com/order/admin/' + adminId + '/top'
    );
  }

  cancelOrder(orderId: any) {
    return this.myHttp.put(
      'https://ecommerceiti-heba.onrender.com/order/' + orderId + '/cancle',
      ''
    );
  }

  acceptOrder(orderId: any) {
    return this.myHttp.put(
      'https://ecommerceiti-heba.onrender.com/order/' + orderId + '/accept',
      ''
    );
  }
}
