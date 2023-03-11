
import { Component, OnInit } from '@angular/core';
import { CartService } from './../../Services/cart/cart.service';
import { WishlistService } from './../../Services/wishlist/wishlist.service';

import {
  faChevronRight,
  faMapMarkedAlt,
  faEnvelope,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  iconRight = faChevronRight;
  iconMap = faMapMarkedAlt;
  iconEnv = faEnvelope;
  iconPhone = faPhoneAlt;
  items: any;
  items2: any;
  totalitems: number = 0;
  totalitems2: number = 0;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {}
  ngOnInit() {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)._id;
    this.cartService.getCartitems(userId).subscribe({
      next: (res: any) => {
        this.items = res;
        this.totalitems = this.items.numOfItem;
        console.log(this.totalitems);
        localStorage.setItem('cartitems', this.totalitems.toString());
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.wishlistService.getWishlistitems(userId).subscribe({
      next: (res: any) => {
        this.items2 = res;
        this.totalitems2 = this.items2.count;
        localStorage.setItem('wishlistitems', this.totalitems2.toString());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
