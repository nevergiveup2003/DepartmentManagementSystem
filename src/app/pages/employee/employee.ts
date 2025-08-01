import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http';
import { Table } from '../../components/table/table';
import { IEmployee } from '../../types/IEmployee';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { EmployeeForm } from './employee-form/employee-form';
@Component({
  selector: 'app-employee',
  imports: [Table, MatButtonModule],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employee {
  httpService = inject(HttpService);
  employeeList: IEmployee[] = [];
  showCols = ['id', 'name', 'email', 'phone', 'action'];
  ngOnInit() {
    this.httpService.getEmployeeList().subscribe((result) => {
      this.employeeList = result;
    });
  }
  edit(employee: IEmployee) {
    console.log(employee);
  }
  delete(employee: IEmployee) {
    console.log(employee);
  }

  add() {
    this.openDialog();
  }
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    this.dialog.open(EmployeeForm, {
      panelClass: 'm-auto',
    });
  }
}
