import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { ProductsComponent } from './Components/products/products.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { SettingsComponent } from './Components/settings/settings.component';
import { AddProductDialogComponent } from './Components/add-product-dialog/add-product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { LayoutModule } from '@angular/cdk/layout';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { AddCategoryDialogComponent } from './Components/add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from './Components/edit-category-dialog/edit-category-dialog.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CouponsComponent } from './Components/coupons/coupons.component';
import { AddCouponDialogComponent } from './Components/add-coupon-dialog/add-coupon-dialog.component';
import { EditCouponDialogComponent } from './Components/edit-coupon-dialog/edit-coupon-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SidebarComponent,
    ProductsComponent,
    OrdersComponent,
    CategoriesComponent,
    SettingsComponent,
    AddProductDialogComponent,
    EditProductComponent,
    AddCategoryDialogComponent,
    EditCategoryDialogComponent,
    FilterPipe,
    DashboardComponent,
    CouponsComponent,
    AddCouponDialogComponent,
    EditCouponDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    LayoutModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
