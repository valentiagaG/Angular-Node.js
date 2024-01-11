import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent, NgxUiLoaderModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
