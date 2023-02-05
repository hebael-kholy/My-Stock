import { Component } from '@angular/core';
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
export class HomeComponent {
  iconRight = faChevronRight;
  iconMap = faMapMarkedAlt;
  iconEnv = faEnvelope;
  iconPhone = faPhoneAlt;

  constructor() {}
}
