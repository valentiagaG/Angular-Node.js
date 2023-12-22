import { Component, inject } from '@angular/core';
import { AttractionsService } from '../services/attractionService/attractions.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf],
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.css'
})

export class AttractionsComponent {

  showSuccessAlert = false;
  
  name = '';
  add = '';
  acc = 0;
  aimedTo = '';
  danger= 0;

  
  // data = {
  //   name: this.name,
  //   address: this.add,
  //   accesibility: this.acc,       
  //   aimedTo: this.aimedTo,
  //   danger: this.danger,                  
  // };

  public attService = inject (AttractionsService);
  modalVisible = false;

  toggleModal() {
    this.modalVisible = !this.modalVisible;
  }

  postAttraction(){
    console.log(this.name, this.add, this.acc, this.danger, this.aimedTo);
    this.attService.postAttraction(this.name, this.add, this.acc, this.danger, this.aimedTo);
    this.showSuccessAlert = true;
    this.modalVisible = false;
  }
}
