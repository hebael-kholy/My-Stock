import { Component } from '@angular/core';
import { faStar, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from './../../Services/products/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-sales-products',
  templateUrl: './sales-products.component.html',
  styleUrls: ['./sales-products.component.css'],
})
export class SalesProductsComponent {
  icon = faStar;
  iconCart = faCartShopping;
  products: any[] = [];

  isLoading = false;

  constructor(public myService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.myService.getAllProducts().subscribe((data: any) => {
      console.log(data);
      this.isLoading = false;
      this.products = data;
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    smartSpeed: 1000,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    navText: [
      '<i class="fa fa-caret-left"></i>',
      '<i class="fa fa-caret-right"></i>',
    ], //we can write html here in navText values
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
  };
}
