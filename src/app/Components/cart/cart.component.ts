import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/Services/cart/cart.service';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { ProductsService } from 'src/app/Services/products/products.service';


import Swal from 'sweetalert2';
import {
  CartItem,
  ProductDetailsComponent,
} from '../product-details/product-details.component';




export class Coupon{
  coupon!: string;
}

export class Order {
  shippingPrice!: number;
  taxPrice!: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: any[] = [];
  product: any;
  productId: number = 0;
  totalPrice: any;

  itemId: any;
  productTitle: any;
  data2: any;
  value: any;
  cartId: any;
  cartitems: any;

  isloading = true;
  coupon_value = "";
  Discountt:number =0;
  totalAfterDiscount:number = 0;
  newdisc:any;
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user)._id;

  constructor(public route: ActivatedRoute, public myService: CartService ,public wishlistService : WishlistService) {}
  ngOnInit(): void {
    this.myService.getCartitems(this.userId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isloading = false;
        this.data2 = res.data;
        this.items = res.data.cartItems;
        console.log(this.items);
        this.cartId = res.data._id;
        console.log(`this is cart id ${this.cartId}`);
        this.totalPrice = res.data.totalCarPrice;

        this.totalAfterDiscount = this.totalPrice;
        this.newdisc = 0;
        console.log(this.totalPrice);

      },
    
      error: (err: any) => {
        console.log(err.error.message);

      },
    });
  }

  getCartTotal() {
    this.myService.getCartitems(this.userId).subscribe((res: any) => {
      console.log(res);
      this.totalPrice = res.data.totalCarPrice;
      //console.log(this.coupon_value);
 if(this.coupon_value === ""
 ){
  this.totalAfterDiscount = this.totalPrice;

  console.log("hala");
 }
     else{ this.totalAfterDiscount = res.data.totalAfterDiscount;
      this.newdisc = localStorage.getItem('disc');
    console.log("not")}
      this.Discountt = res.discount;
      
      console.log(this.totalAfterDiscount);
      console.log(this.Discountt);

    });
  }

  removeitem(item: any) {
    this.itemId = item._id;
    console.log(`this id for item ${this.itemId}`);
    console.log(`this id for user ${this.userId}`);
    this.myService
      .removeitemfromcart(this.userId, this.itemId)
      .subscribe((res) => {
        this.items.splice(this.items.indexOf(item), 1);
        this.totalPrice = this.data2.totalCarPrice;
        this.getCartTotal();
        this.cartitems = Number(localStorage.getItem('cartitems'));
        this.cartitems -= 1;
        localStorage.setItem('cartitems', this.cartitems);
      });
  }

  clearcart() {
    console.log(`this id for user ${this.userId}`);
    this.myService.clearCart(this.userId).subscribe((res) => {
      console.log(res);
      this.items = [];
      this.cartitems = localStorage.getItem('cartitems');
      this.cartitems = 0;
      localStorage.setItem('cartitems', this.cartitems);
    });
  }

  updateItemQuantity(item: any) {
    this.itemId = item._id;
    let updateditem: any = {
      quantity: this.value,
    };
    this.value = item.quantity;
    console.log(`this id for item ${this.itemId}`);
    console.log(`this id for user ${this.userId}`);
    this.myService
      .UpdateQuantity(this.userId, this.itemId, updateditem)
      .subscribe((res) => {
        console.log(res);

        this.getCartTotal();
        

      });
  }

  AddOrder() {
    console.log(`this is userid ${this.userId}`);

    let order: Order = {
      shippingPrice: 0,
      taxPrice: 14,
    };
    console.log(typeof order);
    console.log(order);

    this.myService
      .createOrder(this.userId, this.cartId, order)
      .subscribe((res) => {
        console.log(res);
      });
    this.items = [];
    this.cartitems = localStorage.getItem('cartitems');
    this.cartitems = 0;
    localStorage.setItem('cartitems', this.cartitems);
    Swal.fire('Your order has been Checkout', '', 'success');
  }

  apply(){

    let coupon :Coupon = {
      coupon:this.coupon_value,
    }
    console.log(this.coupon_value)
    this.myService.applycoupon(this.userId,coupon).subscribe(
        { next:(res:any)=>{
      console.log(res);
      this.Discountt = res.discount;
      localStorage.setItem('disc', this.Discountt.toString())
      console.log(this.Discountt);
      this.totalAfterDiscount = res.data.totalAfterDiscount;
      console.log(this.Discountt);
      Swal.fire('You got the Discount', '', 'success');
      this.getCartTotal();
        },
        error:(err)=>{Swal.fire('Please Enter a valid Coupon', '', 'error');}

    })
  }



  

}
