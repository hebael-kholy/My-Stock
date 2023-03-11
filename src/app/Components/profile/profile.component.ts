import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  idUser: any;
  user: any;
  username: any;
  mail: any;
  token: any;
  imagePath: any;
  gender: any;
  isEditName = false;
  isEditMail = false;
  isEditGender = false;

  isEditPassword = false;
  File: any;
  imgText = 'Select Image';
  isLoading = false;
  password: any;
  hide = true;


  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),


    password: new FormControl('', [Validators.minLength(3)]),

  });

  @Output() formEvent = new EventEmitter();

  get NameValid() {
    return this.form.controls['username'].valid;
  }
  get mailValid() {
    return this.form.controls['email'].valid;
  }
  nameError = 'name is required';
  mailError = 'mail is required';

  constructor(myActivated: ActivatedRoute, public myService: UserService) {}
  ngOnInit(): void {
    //set values in local storage
    this.token = localStorage.getItem('token');
    console.log(this.token);
    this.username = localStorage.getItem('name');
    console.log(this.username);
    this.mail = localStorage.getItem('mail');
    console.log(this.mail);
    this.idUser = localStorage.getItem('id');
    console.log(this.idUser);
    this.imagePath = localStorage.getItem('image');
    console.log(this.imagePath);
    this.gender = localStorage.getItem('gender');

    //get all users
    this.myService.getOneUser(this.idUser).subscribe({
      next: (res) => {
        this.user = res;
        console.log(this.user);
        console.log(this.user.data.name);
        // console.log(this.user.data[0].gender);
      },
      error(err) {
        console.log(err);
      },
    });
    // end ngOnIt
  }
  // switch inputs display editing
  EditName(item: any) {
    this.isEditName = true;
    this.isEditMail = false;
    this.isEditGender = false;
    this.isEditPassword = false;
  }
  EditMail(item: any) {
    this.isEditMail = true;
    this.isEditName = false;
    this.isEditGender = false;

    this.isEditPassword = false;

  }
  EditGender() {
    this.isEditGender = true;
    this.isEditMail = false;
    this.isEditName = false;
    this.isEditPassword = false;
  }
  EditPassword() {
    this.isEditPassword = true;
    this.isEditGender = false;
    this.isEditMail = false;
    this.isEditName = false;
  }

  // drop down box to select
  onSelected(value: string): void {
    this.gender = value;
    console.log(this.gender);
  }

  // change  profile pic
  handleFileInput(event: any) {
    this.File = event.target.files[0];
    console.log(this.File);
    this.imgText = this.File.name;
  }
  Upload() {
    const formData = new FormData();
    formData.append('image', this.File);
    console.log(formData);
    this.isLoading = true;
    this.myService.updateUserImage(this.idUser, formData).subscribe(
      (res: any) => {
        console.log(res);
        this.imagePath = res.user.image;
        this.isLoading = false;
        localStorage.setItem('image', this.imagePath);
        // location.reload();
      },
      (err) => {
        Swal.fire('Sorry....', 'please select img to change', 'error');
        this.isLoading = false;
      }
    );
    // console.log(this.idUser);
    // if(this.File){
    //   console.log(this.imagePath);
    //   this.imagePath = this.user.data.image;
    //   console.log(this.imagePath);

    //   // Swal.fire('Done', 'Updated picture', 'success');
    // }else{
    //   Swal.fire('Sorry....', 'please select img to change', 'error');
    // }
    console.log(this.imagePath);
  }
  //  this.myService.updateUserImage(this.idUser,user).subscribe();

  // update user

  Update(name: any, email: any, password: any, gender: any) {
    let user: any;
    if (password) {
      user = { name: name, email: email, password: password, gender: gender };
      console.log(user);
    } else {
      user = { name: name, email: email, gender: gender };
      console.log(user);
    }
    console.log('hi iam user');
    if (this.form.status === 'VALID') {
      this.formEvent.emit(this.form.value);
    } else {
      this.nameError = 'name is required';
      this.mailError = ' pattern must be email@example.com';
    }

    this.myService.updateUser(this.idUser, user).subscribe({
      next: (res: any) => {
        localStorage.setItem('name', user.name);
        localStorage.setItem('mail', user.email);
        localStorage.setItem('gender', user.gender);
        Swal.fire('Done', 'Updated Successfully', 'success');
      },
      error: (err) => {
        console.log(err);
        var nameErr = `Plan executor error during findAndModify :: caused by :: E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${
          this.form.get('email')?.value
        }" }`;
        if (err.error.message == nameErr) {
          this.isLoading = false;
          Swal.fire({
            icon: 'warning',
            title: 'Email Already Exists!!!',
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
      },
    });

  }
}
