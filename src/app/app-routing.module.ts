import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductDialogComponent } from './Components/add-product-dialog/add-product-dialog.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { CouponsComponent } from './Components/coupons/coupons.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ProductsComponent } from './Components/products/products.component';
import { SettingsComponent } from './Components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'coupons', component: CouponsComponent },
    ],
  },
  {
    path: 'addProductDialoge',
    component: AddProductDialogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
