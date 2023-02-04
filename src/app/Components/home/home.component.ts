import { Component } from '@angular/core';
import {
  faStar,
  faCartShopping,
  faChevronRight,
  faMapMarkedAlt,
  faEnvelope,
  faPhoneAlt,
} from '@fortawesome/free-solid-svg-icons';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  icon = faStar;
  iconCart = faCartShopping;
  iconRight = faChevronRight;
  iconMap = faMapMarkedAlt;
  iconEnv = faEnvelope;
  iconPhone = faPhoneAlt;

  constructor() {}
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
