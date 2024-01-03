import { Component, OnInit, inject } from '@angular/core';
import { AttractionsService } from '../../services/attractionService/attractions.service';
import { NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Attraction } from '../../interfaces/req-res';
import { AgGridModule } from 'ag-grid-angular'; // Angular Grid Logic
import { ColDef } from 'ag-grid-community'; // Column Definitions Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { GridReadyEvent } from 'ag-grid-community';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [RouterModule, FormsModule, NgIf, MatFormFieldModule, MatInputModule, MatTableModule, ReactiveFormsModule, AgGridModule, SpinnerComponent],
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.css'
})

export class AttractionsComponent {

  public attService = inject(AttractionsService);
  themeClass =
  "ag-theme-quartz";

  rowData: Attraction[] = [];

  colDefs: ColDef[] = [
    { field: "name", width: 200 },
    { field: "address", width: 300 },
    { field: "accesibility", width: 150 },
    { field: "aimedTo", width: 200 },
    { field: "danger", width: 100 },
  ];

  public defaultColDef: ColDef = {
    editable: true,
    filter: true,
  };

  myFormControl = new FormControl();

  onGridReady(params: GridReadyEvent) {
    if (this.attService.loading()) {
      setTimeout(() => this.onGridReady(params), 200);
      return;
    }
    
    this.rowData = this.attService.attractions();
   
  }


  estaCargando() {
    return this.attService.loading();
  }


  showSuccessAlert = false;

  name = '';
  add = '';
  acc = 0;
  aimedTo = '';
  danger = 0;


  modalVisible = false;

  toggleModal() {
    this.modalVisible = !this.modalVisible;
  }

  postAttraction() {
    console.log(this.name, this.add, this.acc, this.danger, this.aimedTo);
    this.attService.postAttraction(this.name, this.add, this.acc, this.danger, this.aimedTo);
    this.showSuccessAlert = true;
    this.modalVisible = false;
  }


}


