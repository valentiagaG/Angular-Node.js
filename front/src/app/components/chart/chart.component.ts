import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgChartsModule, PieChartComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  constructor(private router: Router){

  }
  redirectToAttractions(){
    this.router.navigate(['/attractions']);
  }
}
