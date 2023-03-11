import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CouponsService } from './../../Services/coupons/coupons.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-coupon-dialog',
  templateUrl: './edit-coupon-dialog.component.html',
  styleUrls: ['./edit-coupon-dialog.component.css'],
})
export class EditCouponDialogComponent {
  formValue!: FormGroup;
  newImg: any;
  url = this.data.image;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public couponService: CouponsService,
    public dialogRef: MatDialogRef<EditCouponDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data.image);
    this.formValue = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      expire: [this.data.expire.substring(0, 10), Validators.required],
      discount: [this.data.discount, Validators.required],
    });
  }

  EditCoupon() {
    var coupon = {
      name: this.formValue.get('name')?.value,
      expire: this.formValue.get('expire')?.value,
      discount: this.formValue.get('discount')?.value,
    };

    this.isLoading = true;
    this.couponService.updateCoupon(this.data.id, coupon).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Coupon Updated Successfully',
          showConfirmButton: true,
        });
      },
      error: (err: any) => {
        console.log(err);
        var nameErr = `Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.couypons index: name_1 dup key: { name: \"${
          this.formValue.get('name')?.value
        }\" }`;
        if (err.error.message == nameErr) {
          this.isLoading = false;
          this.formValue.patchValue({
            name: this.data.name,
          });
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
