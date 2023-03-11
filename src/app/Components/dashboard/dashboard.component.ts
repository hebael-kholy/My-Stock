import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders/orders.service';
import { ProductService } from 'src/app/Services/product/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  id = localStorage.getItem('id');
  totalOrders: any;
  productSold: number = 0;
  totalIncome: any;
  totalUsers: any;
  isLoading = false;
  lastOrders: any;
  topProducts: any;

  constructor(
    public orderService: OrdersService,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getTopProducts();
    this.getAllOrders();
    this.getIncome();
    this.getAllUsers();
    this.getLastOrders();
  }

  getAllOrders() {
    this.isLoading = true;
    this.orderService.getAllOrders(this.id).subscribe({
      next: (res: any) => {
        console.log('orders', res.data);
        this.totalOrders = res.orderCount;
        let orders = res.data;
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].status === 'accepted') {
            this.productSold += orders[i].cartItems.length;
          }
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  getLastOrders() {
    this.isLoading = true;
    this.orderService.getLastOrders(this.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.lastOrders = res.data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  getAllUsers() {
    this.isLoading = true;
    this.orderService.getAllUsers().subscribe({
      next: (res: any) => {
        console.log(res);
        this.totalUsers = res.usersCount;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  getTopProducts() {
    this.isLoading = true;
    this.productService.getTopProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.topProducts = res.data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  getIncome() {
    this.isLoading = true;
    this.orderService.getAllOrders(this.id).subscribe({
      next: (res: any) => {
        let income = 0;
        for (let i = 0; i < res.data.length; i++) {
          income += res.data[i].totalPrice;
        }
        this.totalIncome = `$ ${income}`;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
