import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isAuthenticated = false;

  constructor(private router: Router, private httpClient: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    this.isAuthenticated = true;
    return this.httpClient.post(
      'https://ecommerceiti-heba.onrender.com/users/login',
      obj
    );
  }

  createUser(data: any): Observable<any> {
    return this.httpClient.post(
      'https://ecommerceiti-heba.onrender.com/users/signup',
      data
    );
  }

  logOut() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('mail');
    localStorage.removeItem('password');
    localStorage.removeItem('gender');
    localStorage.removeItem('image');
    localStorage.removeItem('user');

    localStorage.removeItem('email');
    localStorage.removeItem('cartitems');
    localStorage.removeItem('wishlistitems');
    this.router.navigate(['login']);
    // location.reload();

  }

  checkLoginStatus() {
    return localStorage.getItem('token');
  }


  resetPassword(data: any) {
    return this.httpClient.post(
      'https://ecommerceiti-heba.onrender.com/forgetpass',
      data
    );
  }

  veryfyCode(data: any) {
    return this.httpClient.post(
      'https://ecommerceiti-heba.onrender.com/forgetpass/verify',
      data
    );
  }
  changePassword(data: any) {
    return this.httpClient.put(
      'https://ecommerceiti-heba.onrender.com/forgetpass',
      data
    );
  }

}
