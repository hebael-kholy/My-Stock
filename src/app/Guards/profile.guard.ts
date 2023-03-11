import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './../Services/auth/auth.service';
import { UserService } from 'src/app/Services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  constructor(
    private authService: LoginService,
    private router: Router,
    private userServ: UserService
  ) {}

  loginStatus = this.authService.checkLoginStatus();

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuthenticated || this.loginStatus) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
