import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders/orders.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'name',
    'date',
    'price',
    'title',
    'state',
    'delete',
  ];

  dataSource: any;
  isLoading = false;
  id: any;
  apiRes:any = [];
  constructor(public orderService: OrdersService) {}

  ngOnInit(): void {
    this.getOrders();
    this.onChange(event);
  }

  getOrders() {
    this.isLoading = true;
    this.id = localStorage.getItem('id');
    this.orderService.getAllOrders(this.id).subscribe((res: any) => {
      console.log(res.data);
      this.apiRes = res.data;
      console.log(this.apiRes);
      // this.dataSource = res.data;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  cancelOrder(orderId: any) {
    this.isLoading = true;
    this.orderService.cancelOrder(orderId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        this.getOrders();
        Swal.fire({
          icon: 'success',
          title: 'Order Cancelled Successfully',
          showConfirmButton: true,
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'warning',
          title: 'Something Went Wrong!!!',
          showConfirmButton: true,
        });
      },
    });
  }
  acceptOrder(orderId: any) {
    this.isLoading = true;
    this.orderService.acceptOrder(orderId).subscribe({
      next: (res: any) => {
        console.log(res);
        // this.isAccepted = true;
        this.isLoading = false;
        this.getOrders();
        Swal.fire({
          icon: 'success',
          title: 'Order Accepted Successfully',
          showConfirmButton: true,
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'warning',
          title: 'Something Went Wrong!!!',
          showConfirmButton: true,
        });
      },
    });
  }
  onChange($event: any) {
    if($event.value === "All"){
      this.isLoading=true;
      this.getOrders();
      this.isLoading=false;
    }
    else{
      let statusData = _.filter(this.apiRes, (item)=>{
        console.log($event.value);
        // console.log(item.status);
        return item.status === $event.value;
      });
      this.dataSource = new MatTableDataSource(statusData);
      this.dataSource.paginator = this.paginator;
    }
  }
}
