import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { AboutComponent } from './Components/about/about.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { SideOrderComponent } from './Components/side-order/side-order.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProfileGuard } from './Guards/profile.guard';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { VerifyCodeComponent } from './Components/verify-code/verify-code.component';
import { NewPasswordComponent } from './Components/new-password/new-password.component';

// import { ErrorComponent } from './Components/error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  { path: 'profile/settings', component: ProfileComponent },
  { path: 'profile/orders', component: SideOrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetPass', component: ResetPasswordComponent },
  { path: 'verifyCode', component: VerifyCodeComponent },
  { path: 'newPassword', component: NewPasswordComponent },
  { path: 'products', component: AllProductsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'getCart', component: CartComponent, canActivate: [ProfileGuard] },
  {
    path: 'getWishlist',
    component: WishlistComponent,
    canActivate: [ProfileGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
