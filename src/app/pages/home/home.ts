import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Dashboard } from '../../services/dashboard';

@Component({
  selector: 'app-home',
  imports: [MatCardModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  salaryForMonth!: number;
  employeeCount!:number;
  departmentCount!:number
  dashboardService = inject(Dashboard);
  ngOnInit(){
    this.dashboardService.getDashBoardData().subscribe(result=>{
      this.salaryForMonth = result.totalSalary
      this.employeeCount = result.employeeCount
      this.departmentCount = result.departmentCount


    })
  }
}
