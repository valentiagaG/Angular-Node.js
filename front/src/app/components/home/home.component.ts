import { Component, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {NgFor, NgIf} from '@angular/common';
import { HotelsService } from '../../services/hotels/hotels.service';
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FormsModule, NgIf, NgFor, SlickCarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  responseData: any;

  public hotelService = inject (HotelsService);

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplayspeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "arrows": true,
    "responsive": [
      {
        "breakpoint": 768,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 2,
          "slidesToScroll": 1,
        }
      },
    ]
  };
}
