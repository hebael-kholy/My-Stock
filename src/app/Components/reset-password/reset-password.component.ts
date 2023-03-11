import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private services: LoginService,
    private router: Router
  ) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

          ),
        ],
      ],
    });
  }

  resetForm: any = {
    email: '',
  };

  isLoading = false;

  onSubmit() {
    this.isLoading = true;
    this.services.resetPassword(this.resetForm).subscribe(
      (res) => {
        // localStorage.setItem('email', JSON.stringify(this.resetForm.email));
        this.isLoading = false;
        console.log(typeof this.resetForm.email);
        localStorage.setItem('email', this.resetForm.email);
        let emaill = localStorage.getItem('email');
        console.log(emaill);
        this.router.navigate(['/verifyCode']);
      },
      (err) => {
        this.isLoading = false;
        console.log(err);
        var nameErr = `User not found`;
        if (err.error.message == nameErr) {
          this.isLoading = false;
          Swal.fire({
            icon: 'warning',
            title: "Email doesn't Exist!!!",
            showConfirmButton: true,
          });
          this.form.patchValue({
            email: localStorage.getItem('mail'),
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Something Went Wrong!!!',
            showConfirmButton: true,
          });
        }
      }
    );

  }
}
