import { Component, OnInit, inject } from '@angular/core';
import { AttractionsService } from '../../services/attractionService/attractions.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf, MatFormFieldModule, MatTableModule],
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.css'
})

export class AttractionsComponent implements OnInit {

  columnas: string[] = ['codigo', 'descripcion', 'precio'];
  datos: Articulo[] = [new Articulo(1, 'papas', 55),
  new Articulo(2, 'manzanas', 53),
  new Articulo(3, 'naranjas', 25),
  ];

  // dataSource = new MatTableDataSource<any>
  dataSource:any; 

  ngOnInit() {
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

export class Articulo {
  constructor(public codigo: number, public descripcion: string, public precio: number) {
}
}
