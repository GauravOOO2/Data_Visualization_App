// src/app/view-data/view-data.component.ts

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Add this import

Chart.register(...registerables); // Add this line to register all chart components

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent implements OnInit, AfterViewInit {
  @ViewChild('tempChart') chartCanvas!: ElementRef;
  dataEntries: { datetime: string, temperature: number }[] = [];  // Data array
  chart: Chart | undefined;  // Update the type

  constructor(private dataService: SharedDataService) {}

  ngOnInit() {
    // Subscribe to data from the shared service
    this.dataService.data$.subscribe(entries => {
      this.dataEntries = entries;
      if (this.dataEntries.length > 0) {
        this.updateChart();
      }
    });
  }

  ngAfterViewInit() {
    // Initialize an empty chart
    this.initChart();
  }

  initChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Temperature',
          data: [],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    };
    this.chart = new Chart(ctx, config);
  }

  updateChart() {
    if (!this.chart) {
      this.initChart();
    }

    if (this.chart) {
      this.chart.data.labels = this.dataEntries.map(entry => new Date(entry.datetime).toLocaleString());
      this.chart.data.datasets[0].data = this.dataEntries.map(entry => entry.temperature);
      this.chart.update();
    }
  }
}
