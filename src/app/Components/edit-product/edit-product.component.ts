import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Data } from '@angular/router';
import { ProductService } from 'src/app/Services/product/product.service';
import Swal from 'sweetalert2';
import { DialogData } from '../add-product-dialog/add-product-dialog.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Service: ProductService,
    private build: FormBuilder,
    private http: HttpClient,
    private router: ActivatedRoute
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  base64: any = '';
  form!: FormGroup;
  categories: [] | any = [];
  selectedFile!: File;
  url = this.data.image;
  categoryName = this.data.category;

  uploadImgFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      };
    }
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({
      image: file,
    });
    this.form.get('image')?.updateValueAndValidity();
  }

  getCatergory() {
    this.Service.getAllCategories().subscribe((res: any) => {
      this.categories = res.data;
      console.log(this.categories);
      console.log(this.categories[2]._id);
    });
  }

  getSelectedCateory(event: any) {
    this.form.get('category')!.setValue(event.target.value);
    console.log(this.form);
  }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.build.group({
      id: this.data.id,
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      price: [this.data.price],
      image: [this.data.image],
      category: [this.data.category],
      quantity: [this.data.quantity],
    });
    console.log(this.data);
    this.getCatergory();
    this.getSelectedCateory(event);
  }

  updateprodImg() {
    var formData: any = new FormData();
    formData.append('image', this.form.get('image')?.value);
    if (this.form.get('image')?.value != null) {
      this.Service.updateImage(this.data.id, formData).subscribe({
        next: (res: any) => {
          console.log(res);
        },
        // error: (err) => {
        //   // this.isLoading = false;
        //   localStorage.setItem('loading', 'false');
        //   console.log(err);
        //   Swal.fire({
        //     icon: 'warning',
        //     title: 'Something Went Wrong!!!',
        //     showConfirmButton: true,
        //   });
        // },
      });
    }
  }

  isLoading = false;
  Save() {
    this.isLoading = true;
    let user: any;
    let title = this.form.get('title')!.value;
    let description = this.form.get('description')?.value;
    let price = this.form.get('price')?.value;
    let quantity = this.form.get('quantity')?.value;
    // let category = this.form.get('category')?.value;
    let category = '';
    // let name = this.formValue.get('name')?.value;
    // let email = this.formValue.get('email')?.value;
    // let password = this.formValue.get('password')?.value;
    const formData: any = new FormData();
    // formData.append('title', this.form.get('title')!.value);
    // formData.append('price', this.form.get('price')!.value);
    if (this.form.get('category')!.value !== null) {
      category = this.form.get('category')!.value;
    } else {
      category = this.data.category;
    }
    user = {
      title: title,
      description: description,
      price: price,
      quantity: quantity,
      category: category,
    };
    // formData.append('description', this.form.get('description')!.value);
    // formData.append('image', this.form.get('image')!.value);
    this.Service.editProduct(this.data.id, user).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
        Swal.fire('Product Added successfully', '', 'success');
        this.isLoading = false;
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        var nameErr = `Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.products index: title_1 dup key: { title: "${
          this.form.get('title')?.value
        }" }`;
        if (err.error.message == nameErr) {
          this.form.patchValue({
            title: this.data.title,
          });
          Swal.fire({
            icon: 'warning',
            title: 'Title Already Exists!!!',
            showConfirmButton: true,
          });
        } else {
          this.isLoading = false;
          Swal.fire({
            icon: 'warning',
            title: 'Something Went Wrong!!!',
            showConfirmButton: true,
          });
        }
      },
    });
    this.updateprodImg();
  }
}
