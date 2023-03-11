import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CouponsService } from './../../Services/coupons/coupons.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddCouponDialogComponent } from './../add-coupon-dialog/add-coupon-dialog.component';
import { EditCouponDialogComponent } from './../edit-coupon-dialog/edit-coupon-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
})
export class CouponsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'name',
    'createdate',
    'discount',
    'expiredate',
    'change',
  ];

  dataSource: any = [];
  isLoading = false;
  isDeleted = false;
  isAdded = false;
  isEdited = false;
  searchText = '';

  constructor(public couponService: CouponsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCoupons();
  }

  FilterChange(event: any) {
    const filterVal = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterVal;
  }

  getCoupons() {
    this.isLoading = true;
    this.couponService.getAllCoupons().subscribe((res: any) => {
      console.log(res);
      // this.dataSource = res.data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addModal() {
    const dialogRef = this.dialog.open(AddCouponDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isAdded = true;
      this.getCoupons();
    });
  }

  editModal(name: any, expire: any, discount: any, id: any) {
    const dialogRef = this.dialog.open(EditCouponDialogComponent, {
      width: '350px',
      data: { name: name, expire: expire, discount: discount, id: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isEdited = true;
      this.getCoupons();
    });
  }

  deleteCoupon(couponId: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success m-4',
        cancelButton: 'btn btn-danger m-4',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure you want to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.couponService.deleteCoupon(couponId).subscribe({
            next: (res: any) => {
              console.log(res);
              this.isDeleted = true;
              swalWithBootstrapButtons.fire({
                title: 'Deleted Successfully',
                icon: 'success',
                showCloseButton: true,
                showConfirmButton: false,
              });
              this.getCoupons();
            },
            error: (err) => {
              console.log(err);
              Swal.fire({
                icon: 'warning',
                title: 'Something Went Wrong !!!',
                showConfirmButton: true,
              });
            },
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Delete Cancelled',
            icon: 'info',
          });
        }
      });
  }
}
