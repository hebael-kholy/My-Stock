import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit{
  constructor(private fb: FormBuilder, private services: LoginService, private router: Router){}

  // move(event: any){

  // }
  @ViewChildren('ngOtpInput') ngOtpInputRef: any;
  title = 'otp-app';

  otp!: string;
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";
  resetCode: string = "";

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between',
  }



  ngOnInit() {
    this.onOtpChange(event);
    // this.verify();
    // this.setVal(val);

  }
   arr :any=[];
  onOtpChange(event: any) {
    this.otp = event;
    if(this.otp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.otp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if(this.otp.length == this.configOptions.length) {
      this.inputDigitLeft = "Let's go!";
      this.btnStatus = 'btn-primary';
      // this.btnStatus = 'btnColor';
    }
    // this.arr.push(event);
    // console.log(this.arr);
    this.resetCode = event;

  }
  isLoading = false;

  verify(){
  this.isLoading = true;
    this.services.veryfyCode({code: this.ngOtpInputRef.first.currentVal}).subscribe(res=>{
    this.isLoading = false;
      console.log(res);
      this.router.navigate(['/newPassword']);
    },err=>{console.log(err);
      Swal.fire("Invalid Rest Code or Expired","","error");
      this.isLoading = false;

    })
  }

}
