import { Component, OnInit, inject } from '@angular/core';
import { AttractionsService } from '../../services/attractionService/attractions.service';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Attraction } from '../../interfaces/req-res';
import { AgGridModule, ICellRendererAngularComp } from 'ag-grid-angular'; // Angular Grid Logic
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-community'; // Column Definitions Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { GridReadyEvent } from 'ag-grid-community';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CellComponent } from '../cell/cell.component';
import { AccesibleComponent } from '../cell/Accesible/accesible/accesible.component';
import { NotAccesibleComponent } from '../cell/NotAccesible/not-accesible/not-accesible.component';

@Component({
    selector: 'app-attractions',
    standalone: true,
    templateUrl: './attractions.component.html',
    styleUrl: './attractions.component.css',
    imports: [RouterModule, NgIf, MatFormFieldModule, MatInputModule, MatTableModule, AgGridModule, SpinnerComponent, FormsModule, ReactiveFormsModule, MatSelectModule, MatButtonModule, MatIconModule, AccesibleComponent, NotAccesibleComponent]
})

export class AttractionsComponent {

  public attService = inject(AttractionsService);
  themeClass =
  "ag-theme-quartz";

  public searchValue = '';
  private gridApi: GridApi<any> | undefined;
  autoHeightLayout = 'autoHeight';
  
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 20, 30];
  
  public addAttractionForm: FormGroup = this.fb.group({
    name : ['', [Validators.required]],
    address : ['', [Validators.required]],
    acc : [null],
    aimedTo:[null],
    danger: [null]
  })
  

  constructor(private fb:FormBuilder, private router: Router){

  }

  hide = true;

  rowData: Attraction[] = [];

  colDefs: ColDef[] = [
    { field: "name", width: 200, minWidth: 150 },
    { field: "address", width: 300, minWidth: 200 },
    {
      field: "accesibility",
      width: 150,
      minWidth: 100,
      cellRenderer: (params: ICellRendererParams) => {
        if (params.value === 1) {
          return `<span class="material-symbols-outlined" style="color: green;"> sentiment_satisfied </span>`;
        } else if (params.value === 0) {
          return `<span class="material-symbols-outlined" style="color: red;"> sentiment_dissatisfied </span>`;
        } else{
          return ``;
        }
      },
    },
    { field: "aimedTo", width: 200, minWidth: 150 },
    { field: "danger", width: 100, minWidth: 80 },
  ];

  // colDefs: ColDef[] = [
  //   { field: "name", width: 200, minWidth: 150 },
  //   { field: "address", width: 300, minWidth: 200 },
  //   {
  //     field: "accesibility",
  //     width: 150,
  //     minWidth: 100,
  //     cellRendererSelector: (params: ICellRendererParams) => {
  //       if (params.value === 1) {
  //         return { component: AccesibleComponent };
  //       } else {
  //         return  { component: NotAccesibleComponent };
  //       }
  //     },
  //   },
  //   { field: "aimedTo", width: 200, minWidth: 150 },
  //   { field: "danger", width: 100, minWidth: 80 },
  // ];

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
    this.gridApi = params.api;
    this.rowData = this.attService.attractions();
   
  }

  quickSearch() {
    if (this.gridApi) {
      this.gridApi.setGridOption('quickFilterText', this.searchValue);
    }
  }


  estaCargando() {
    return this.attService.loading();
  }

  showSuccessAlert = false;

  modalVisible = false;

  toggleModal() {
    this.modalVisible = !this.modalVisible;
  }

  redirectToChart(){
    this.router.navigate(['/chart']);
  }

  get name(){
    return this.addAttractionForm.get('name')?.value;
  }
  get add(){
    return this.addAttractionForm.get('address')?.value;
  }
  get acc(){
    return this.addAttractionForm.get('acc')?.value;
  }
  get danger(){
    return this.addAttractionForm.get('danger')?.value;
  }
  get aimedTo(){
    return this.addAttractionForm.get('aimedTo')?.value;
  }

  postAttraction() {  
    this.attService.postAttraction(this.name, this.add, this.acc, this.danger, this.aimedTo);
    this.showSuccessAlert = true;
    this.modalVisible = false;

    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
    
  }

}


