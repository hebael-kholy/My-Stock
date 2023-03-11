import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService } from './../../Services/authorization/authorization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  formValue!: FormGroup;
  urlImg: any;
  isLoading = false;
  id = localStorage.getItem('id');
  username = localStorage.getItem('name');
  email = localStorage.getItem('email');
  password = localStorage.getItem('password');
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authorizeService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.urlImg = localStorage.getItem('image');
    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      image: [null],
    });
  }

  openFile() {
    document.getElementById('exampleInputImage')?.click();
  }

  uploadImgFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.urlImg = e.target.result;
      };
    }
    const file = (event.target as HTMLInputElement).files![0];
    this.formValue.patchValue({
      image: file,
    });
    this.formValue.get('image')?.updateValueAndValidity();
  }

  updateImg() {
    var formData: any = new FormData();
    formData.append('image', this.formValue.get('image')?.value);

    if (this.formValue.get('image')?.value != null) {
      localStorage.setItem('loading', 'true');
      this.authorizeService.updateImage(this.id, formData).subscribe({
        next: (res: any) => {
          localStorage.setItem('image', res.user.image);
          this.isLoading = false;
          localStorage.setItem('loading', 'false');
        },
        error: (err) => {
          this.isLoading = false;
          localStorage.setItem('loading', 'false');
          console.log(err);
          Swal.fire({
            icon: 'warning',
            title: 'Something Went Wrong!!!',
            showConfirmButton: true,
          });
        },
      });
    }
  }

  updateData() {
    let user: any;
    let name = this.formValue.get('name')?.value;
    let email = this.formValue.get('email')?.value;
    let password = this.formValue.get('password')?.value;
    user = { name: name, email: email, password: password };

    this.isLoading = true;
    this.authorizeService.updateInfo(this.id, user).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('email', res.user.email);
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Data Updated Successfully',
          showConfirmButton: true,
        });
        this.updateImg();
      },
      error: (e) => {
        this.isLoading = false;
        console.log(e.error.message);
        let errEmail = `Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${email}" }`;
        if (e.error.message == errEmail) {
          Swal.fire({
            icon: 'warning',
            title: 'Email Already Exists!!!',
            showConfirmButton: true,
          });
          this.formValue.patchValue({
            email: localStorage.getItem('email'),
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
}
