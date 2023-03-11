
import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import {
  faCartShopping,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/Services/products/products.service';
import { WishlistService } from 'src/app/Services/wishlist/wishlist.service';


export class Review {
  title!:string;
  rating!:number;
  user!:number;
  productid!:number;

}

export class CartItem {
  product!: number;
  color!: string;
}
export class WihlistItem {
  productId!: number;
}

@Component({

  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  ID = 0;
  product: any;
  productt:any;
  icon = faStar;
  iconCart = faCartShopping;
  cart: any[] = [];
  categoryId: any;
  icon2 = faHeart;
  addedtowishlist: boolean = false;
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user)._id;
  cartitems: any;
  wishlistitems: any;
  username: any;
  image: any;
  comment:any;
  commentss:any;
  comments:any;
  userName:any;
  reviewId:any;
  Reviewcreated:any;
  Rid:any;
 Rimg:any;
 isloading = true;




  constructor(
    public route: ActivatedRoute,
    public myService: ProductsService,
    public wishlistService: WishlistService,
    private changeDetector: ChangeDetectorRef
  ) {
    console.log(route);

    this.ID = route.snapshot.params['id'];
    console.log(this.ID);
  }

  ngOnInit(): void {

    this.isloading = true;
    this.myService.getProductDetails(this.ID).subscribe({
      next: (res) => {
       
        console.log(this.ID);
        console.log(res);
        this.isloading = false
        this.product = res;
        this.productt = this.product.data;
        this.categoryId = this.product.data.category._id;
        console.log(this.categoryId);
        this.myService.getReview(this.ID).subscribe((res)=>{
          console.log(res);
          this.commentss = res;
          this.comments=this.commentss.data;

        })

      },
      error(err) {
        console.log(err);
      },
    });
  }

  
  ngAfterViewChecked(): void {
    this.image = localStorage.getItem('image');
    this.username = localStorage.getItem('name');
    this.changeDetector.detectChanges();
  }

  add() {
    console.log(this.product);
    console.log(`this is userid ${this.userId}`);
    console.log(this.ID);
    let cartitem: CartItem = {
      product: this.ID,
      color: 'purple',
    };
    console.log(typeof cartitem);
    console.log(cartitem);
    this.myService.addtocart(this.userId, cartitem).subscribe((res: any) => {
      this.cartitems = Number(localStorage.getItem('cartitems'));
      localStorage.setItem('cartitems', this.cartitems + 1);
    });
  }

  AddToWishlist() {
    console.log(this.product);

    console.log(`this is userid ${this.userId}`);
    console.log(this.ID);
    let wishlistitem: WihlistItem = {
      productId: this.ID,
    };
    console.log(typeof wishlistitem);
    console.log(wishlistitem);
    this.myService.addtoWishlist(this.userId, wishlistitem).subscribe((res) => {
      console.log(res);
      this.addedtowishlist = true;
      this.wishlistitems = Number(localStorage.getItem('wishlistitems'));
      localStorage.setItem('wishlistitems', this.wishlistitems + 1);
    });
  }

  AddReview(){
    let review :Review ={
      title:this.comment,
      rating:5,
      user:this.userId,
      productid:this.ID,

    }
    console.log(this.ID)
    this.myService.addReview(review).subscribe((res)=>{
      console.log(res);
      this.Reviewcreated = res;
      this.Rid= this.Reviewcreated.data._id;
      console.log(this.Rid);
      this.comments.push(review);
      this.comment = "";
      this.myService.getReview(this.ID).subscribe((res)=>{
        console.log(res);
        this.commentss = res;
        this.comments=this.commentss.data;
      })
    })

  
  }
  DeleteReview(review:any){
   
    if(review._id){
    this.reviewId = review._id;}
    else{
      this.reviewId = this.Rid;
    }
    console.log(this.reviewId)
    this.myService.deleteReview(this.reviewId).subscribe((res)=>{
      console.log(res);
      this.comments.splice(this.comments.indexOf(review), 1);
  })
}



}
