import { Component, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Dashboard } from '../../services/dashboard';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, BaseChartDirective],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  salaryForMonth!: number;
  employeeCount!: number;
  departmentCount!: number;
  dashboardService = inject(Dashboard);

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Department count',
      },
    ],
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  ngOnInit() {
    this.dashboardService.getDashBoardData().subscribe((result) => {
      this.salaryForMonth = result.totalSalary;
      this.employeeCount = result.employeeCount;
      this.departmentCount = result.departmentCount;
    });

    this.dashboardService.getDepartmentData().subscribe((result) => {
      console.log(result);
      this.barChartData.labels = result.map((x) => x.name);
      this.barChartData.datasets[0].data = result.map((x) => x.employeeCount);
      this.chart?.update(); // 🔥 quan trọng
    });
    this.dashboardService.getTodayLeaveData().subscribe((result) => {
      console.log(result);
    });
  }
}
