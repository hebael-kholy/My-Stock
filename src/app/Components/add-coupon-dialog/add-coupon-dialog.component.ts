import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CouponsService } from './../../Services/coupons/coupons.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-coupon-dialog',
  templateUrl: './add-coupon-dialog.component.html',
  styleUrls: ['./add-coupon-dialog.component.css'],
})
export class AddCouponDialogComponent {
  formValue!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public couponService: CouponsService,
    public dialogRef: MatDialogRef<AddCouponDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      expire: ['', Validators.required],
      discount: ['', Validators.required],
    });
  }

  AddNewCoupon() {
    var coupon = {
      name: this.formValue.get('name')?.value,
      expire: this.formValue.get('expire')?.value,
      discount: this.formValue.get('discount')?.value,
    };
    this.isLoading = true;
    this.couponService.addCoupon(coupon).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Coupon Added Successfully',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
        var nameErr = `E11000 duplicate key error collection: test.couypons index: name_1 dup key: { name: \"${
          this.formValue.get('name')?.value
        }\" }`;
        if (err.error.message == nameErr) {
          this.isLoading = false;
          Swal.fire({
            icon: 'warning',
            title: 'Name Already Exists!!!',
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Something Went Wrong!!!',
            showConfirmButton: true,
          });
        }
      },
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
