import { Component, ViewChild, inject } from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import { HotelsService } from '../../services/hotels/hotels.service';
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [FormsModule, NgIf, NgFor, SlickCarouselModule, NgxUiLoaderModule]
})

export class HomeComponent {

  responseData: any;

  public hotelService = inject (HotelsService);
  public http = inject(HttpClient)

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

  estaCargando() {
    return this.hotelService.loading();
  }

  triggerApiCall = () => {
    const requests = [];
    for (let i = 1, i_len = 2; i < i_len; i++) {
      // this._ngxUiLoaderService.start();
      requests.push(this.http.get(`https://jsonplaceholder.typicode.com/posts/${i}`));
    }
  
    forkJoin(requests).subscribe(posts => {
      posts.forEach(post => console.log(post));
    });
  };
}
