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
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { debounceTime } from 'rxjs';
import { PageData } from '../../types/page-data';
@Component({
  selector: 'app-employee',
  imports: [
    Table,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employee {
  httpService = inject(HttpService);
  pagedEmployeeData!: PageData<IEmployee>;
  showCols = ['id', 'name', 'email', 'phone', 'action'];
  filter: any = {
    pageIndex: 0,
    pageSize: 2,
  };
  ngOnInit() {
    this.getLatesDate();
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((result: string | null) => {
        console.log(result);
        this.filter.search = result;
        this.filter.pageIndex = 0;
        this.getLatesDate();
      });
  }
  searchControl = new FormControl('');
  totalData!: number;
  getLatesDate() {
    this.httpService.getEmployeeList(this.filter).subscribe((result) => {
      this.pagedEmployeeData = result;
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
  pageChange(event: any) {
    console.log(event);
    this.filter.pageIndex = event.pageIndex;
    this.getLatesDate();
  }
}
