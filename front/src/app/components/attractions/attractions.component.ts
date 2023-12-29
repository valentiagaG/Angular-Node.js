import { Component, OnInit, inject } from '@angular/core';
import { AttractionsService } from '../../services/attractionService/attractions.service';
import { NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Attraction } from '../../interfaces/req-res';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf, MatFormFieldModule, MatInputModule , MatTableModule, ReactiveFormsModule],
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.css'
})

export class AttractionsComponent implements OnInit {
  public attService = inject (AttractionsService);
  columnas: string[] = ['name','address', 'accesibility', 'aimedTo', 'danger'];
  // En el componente.ts
  myFormControl = new FormControl();

  datos: Attraction[] = [];  
  
  cargarDatos() {
    if (this.attService.loading()) {
      // Espera a que la carga esté completa
      setTimeout(() => this.cargarDatos(), 200);
      return;
    }
    this.datos = this.attService.attractions();
    this.dataSource = new MatTableDataSource(this.datos);
  }
  
  estaCargando(){
    return this.attService.loading();
  }

  dataSource:any; 

  ngOnInit() {
    
    this.cargarDatos();
    this.dataSource = new MatTableDataSource(this.datos);
  }

  

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }  


  showSuccessAlert = false;
  
  name = '';
  add = '';
  acc = 0;
  aimedTo = '';
  danger= 0;

  
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

