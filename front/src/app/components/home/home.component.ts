import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {NgFor, NgIf} from '@angular/common';
import { HotelsService } from '../../services/hotels/hotels.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FormsModule, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent{
  currentIndex = 1;
  private timer: any;
  responseData: any;


  public hotelService = inject (HotelsService);
  
  changeImage() {
    // Cambiar el índice de la imagen cuando se activa el evento mouseover
    this.currentIndex = (this.currentIndex % 4) + 1;
    this.startAutoChange();
  }

  private startAutoChange() {
    // Reinicia el temporizador
    if (this.timer) {
      clearTimeout(this.timer);
    }
  
    // Establece un temporizador para cambiar la imagen después de 1000 ms (1 segundo)
    this.timer = setTimeout(() => {
      // Incrementa el índice y vuelve a la primera imagen si es mayor o igual a 4
      this.currentIndex = (this.currentIndex % 4) + 1;
      console.log(this.currentIndex);
      this.startAutoChange(); // Llama recursivamente para continuar el cambio automático
    }, 2000);
  }
  // private startAutoChange() {
  //   // Reinicia el temporizador
  //   if (this.timer) {
  //      clearTimeout(this.timer);
  //   }

  //   // Establece un temporizador para cambiar la imagen después de 1000 ms (1 segundo)
  //   this.timer = setTimeout(() => {
  //     if (this.currentIndex!==4)
  //       this.currentIndex = (this.currentIndex+1);
  //     else
  //       this.currentIndex = 1;
  //     console.log(this.currentIndex);
      
  //   }, 1000);

  resetImage() {
    // Restablece el índice a 1 cuando el mouse sale del área del carrusel
    this.currentIndex = 1;
  }

  // Limpia el temporizador al destruir el componente
  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  
  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  
}
