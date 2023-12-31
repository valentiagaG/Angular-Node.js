import { Component, OnInit, Signal, inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { AttractionsService } from '../../../services/attractionService/attractions.service';
import { Attraction } from '../../../interfaces/req-res';
import { asyncScheduler, from, observeOn, switchMap } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
  public attService = inject(AttractionsService);
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  
  ngOnInit(): void {
  const updateChart = () => {
    const data = this.attService.attractions();
    const dangerCounts = this.accumulateCountsByDanger(data);

    // Actualiza chart data
    this.pieChartData.labels = Object.keys(dangerCounts);
    this.pieChartData.datasets[0].data = Object.values(dangerCounts);

    // Trigger chart update
    this.chart?.update();
  };

  // Cargar datos iniciales
  updateChart();

  // Suscripción a cambios en las atracciones
  this.attService.attractionsChanged.subscribe(() => {
    updateChart();
  });
}

private accumulateCountsByDanger(attractions: any[]): { [key: string]: number } {
  return attractions.reduce((counts, attraction) => {
    const dangerLevel = attraction.danger;
    const dangerValue = this.mapDangerToNumber(dangerLevel);

    // Acumular utilizando el dangerValue como clave
    counts[dangerValue.toString()] = (counts[dangerValue.toString()] || 0) + 1;
    return counts;
  }, {} as { [key: string]: number });
}

// Función auxiliar para mapear niveles de peligro a valores numéricos
private mapDangerToNumber(dangerLevel: string): string {
  switch (dangerLevel.toLowerCase()) {
    case '1':
      return 'Minimal';
    case '2':
      return 'Low';
    case '3':
      return 'Moderate';
    case '4':
      return 'High';
    case '5':
      return 'Maximun';
    default:
      return dangerLevel; // Devuelve el nivel original si no coincide con ninguno
  }
}

  
  
  private getCountsByDanger(attractions: any[]): { [key: string]: number } {
    return attractions.reduce((counts, attraction) => {
      const dangerLevel = attraction.danger;
      counts[dangerLevel] = (counts[dangerLevel] || 0) + 1;
      return counts;
    }, {} as { [key: string]: number });
  }
  
  
  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = [
      'hen',
      'variable',
      'embryo',
      'instal',
      'pleasant',
      'physical',
      'bomber',
      'army',
      'add',
      'film',
      'conductor',
      'comfortable',
      'flourish',
      'establish',
      'circumstance',
      'chimney',
      'crack',
      'hall',
      'energy',
      'treat',
      'window',
      'shareholder',
      'division',
      'disk',
      'temptation',
      'chord',
      'left',
      'hospital',
      'beef',
      'patrol',
      'satisfied',
      'academy',
      'acceptance',
      'ivory',
      'aquarium',
      'building',
      'store',
      'replace',
      'language',
      'redeem',
      'honest',
      'intention',
      'silk',
      'opera',
      'sleep',
      'innocent',
      'ignore',
      'suite',
      'applaud',
      'funny',
    ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map((_) => randomWord());

    this.chart?.update();
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position =
        this.pieChartOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display =
        !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }
}
