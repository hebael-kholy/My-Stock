import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ErrorComponent } from './Components/error/error.component';
import { AboutComponent } from './Components/about/about.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { SalesProductsComponent } from './Components/sales-products/sales-products.component';
import { SideOrderComponent } from './Components/side-order/side-order.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CartComponent } from './Components/cart/cart.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { VerifyCodeComponent } from './Components/verify-code/verify-code.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NewPasswordComponent } from './Components/new-password/new-password.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    AboutComponent,
    AllProductsComponent,
    SalesProductsComponent,
    SideOrderComponent,
    ProductDetailsComponent,
    CartComponent,
    FilterPipe,
    WishlistComponent,
    ResetPasswordComponent,
    VerifyCodeComponent,
    NewPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CarouselModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatMenuModule,
    MatDialogModule,
    NgOtpInputModule,
    MatButtonModule,
    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
