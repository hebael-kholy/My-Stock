import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  items: any[] = [];
  itemId: any;
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user)._id;
  wishlistitems: any;
  constructor(
    public route: ActivatedRoute,
    public myService: WishlistService
  ) {}
  ngOnInit(): void {
    this.myService.getWishlistitems(this.userId).subscribe((res: any) => {
      console.log(res);
      this.items = res.data;
      console.log(this.items);
    });
  }

  removeItem(item: any) {
    this.itemId = item._id;
    console.log(`this id for item ${this.itemId}`);
    console.log(`this id for user ${this.userId}`);
    this.myService
      .removeitemfromWishlist(this.userId, this.itemId)
      .subscribe((res) => {
        this.items.splice(this.items.indexOf(item), 1);
        console.log(res);
        this.wishlistitems = Number(localStorage.getItem('wishlistitems'));
        this.wishlistitems -= 1;
        localStorage.setItem('wishlistitems', this.wishlistitems);
      });
  }
}
