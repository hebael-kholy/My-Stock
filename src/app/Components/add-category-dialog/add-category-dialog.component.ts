import { Component, Inject, OnInit } from '@angular/core';
import { CategoriesService } from './../../Services/categories/categories.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css'],
})
export class AddCategoryDialogComponent implements OnInit {
  formValue!: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public categoryService: CategoriesService,
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  uploadImgFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.formValue.patchValue({
      image: file,
    });
    this.formValue.get('image')?.updateValueAndValidity();
  }

  AddNewCategory() {
    var formData: any = new FormData();
    formData.append('name', this.formValue.get('name')?.value);
    formData.append('image', this.formValue.get('image')?.value);
    this.isLoading = true;
    this.categoryService.addCategory(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Category Added Successfully',
          showConfirmButton: true,
        });
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
        var nameErr = `E11000 duplicate key error collection: test.gategories index: name_1 dup key: { name: \"${
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
