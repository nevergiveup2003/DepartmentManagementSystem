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
    this.getLatesDate();
  }
  getLatesDate() {
    this.httpService.getEmployeeList().subscribe((result) => {
      this.employeeList = result;
    });
  }
  edit(employee: IEmployee) {
    let ref = this.dialog.open(EmployeeForm, {
      panelClass: 'm-auto',
      data: {
        employeeId: employee.id,
      },
    });
    ref.afterClosed().subscribe((result) => {
      this.getLatesDate();
    });
  }
  delete(employee: IEmployee) {
    console.log(employee);
    this.httpService.deleteEmployeeId(employee.id).subscribe(() => {
      alert('xoa thanh cong');
      this.getLatesDate();
    });
  }

  add() {
    this.openDialog();
  }
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    let ref = this.dialog.open(EmployeeForm, {
      panelClass: 'm-auto',
      data: {},
    });
    ref.afterClosed().subscribe((result) => {
      this.getLatesDate();
    });
  }
}
