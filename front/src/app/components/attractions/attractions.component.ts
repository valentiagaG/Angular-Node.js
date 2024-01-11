import { Component, OnInit, inject } from '@angular/core';
import { AttractionsService } from '../../services/attractionService/attractions.service';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Attraction } from '../../interfaces/req-res';
import { AgGridModule, ICellRendererAngularComp } from 'ag-grid-angular'; // Angular Grid Logic
import { ColDef, GridApi, ICellRendererParams } from 'ag-grid-community'; // Column Definitions Interface
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { GridReadyEvent } from 'ag-grid-community';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AccesibleComponent } from '../cell/Accesible/accesible/accesible.component';
import { NotAccesibleComponent } from '../cell/NotAccesible/not-accesible/not-accesible.component';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-attractions',
    standalone: true,
    templateUrl: './attractions.component.html',
    styleUrl: './attractions.component.css',
    imports: [RouterModule, NgIf, MatFormFieldModule, MatInputModule, MatTableModule, AgGridModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatButtonModule, MatIconModule, AccesibleComponent, NotAccesibleComponent, NgxUiLoaderModule]
})

export class AttractionsComponent {

  public attService = inject(AttractionsService);
  themeClass =
  "ag-theme-quartz";

  public searchValue = '';
  private gridApi: GridApi<any> | undefined;
  autoHeightLayout = 'autoHeight';
  private activeRoute = inject(ActivatedRoute);
  public allAttractions: Attraction[] | undefined;
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 20, 30];
  

  public addAttractionForm: FormGroup = this.fb.group({
    name : ['', [Validators.required]],
    address : ['', [Validators.required]],
    acc : [null],
    aimedTo:[null],
    danger: [null]
  })
  ExcelData: any;

  constructor(private fb:FormBuilder, private router: Router, private ngxService: NgxUiLoaderService){

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

  public defaultColDef: ColDef = {
    editable: true,
    filter: true,
  };

  myFormControl = new FormControl();

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    // Suscribirse al evento attractionsChanged
    this.attService.attractionsChanged.subscribe(() => {
      this.onAttractionsChanged();
    });
  
    // Verificar si hay atracciones cargadas inicialmente
    if (!this.attService.loading()) {
      this.rowData = this.attService.attractions();
    }
  }

  ngOnInit(): void {
    //esto no se si es necesario
    this.activeRoute.queryParamMap.subscribe((data) =>{
      this.allAttractions = this.activeRoute.snapshot.data['attractions'];
    })
    this.attService.attractionsChanged.subscribe(() => {
      this.onAttractionsChanged();
    });
  }

  onAttractionsChanged(): void {
    this.rowData = this.attService.attractions().concat(this.ExcelData);
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

  async postAttraction() {  
    await this.attService.postAttraction(this.name, this.add, this.acc, this.danger, this.aimedTo);
    this.showSuccessAlert = true;
    this.modalVisible = false;
    
  }

  readExcel(event: any){

    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) =>{
      let workBook = XLSX.read(fileReader.result, {type: 'binary'});
      let SheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[SheetNames[0]]);
      // console.log(this.ExcelData);
      this.onAttractionsChanged();
    }

  }
}


