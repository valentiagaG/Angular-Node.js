import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgChartsModule, PieChartComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {

}
