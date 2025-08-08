import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/http';
import { IDepartment } from '../../types/IDepartment';
import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageData } from '../../types/page-data';
import { Table } from '../../components/table/table';
@Component({
  selector: 'app-departments',
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,Table
  ],
  templateUrl: './departments.html',
  styleUrl: './departments.scss',
})
export class Departments {
  httpService = inject(HttpService);
  departments!: PageData<IDepartment>;
  isFormOpen: boolean = false;
  filter = {
    pageIndex: 0,
    pageSize: 5,
  };
  showCols = ['id', 'name', 'action'];

  getLatestData() {
    this.httpService.getDepartments(this.filter).subscribe((result) => {
      this.departments = result;
    });
  }
  ngOnInit() {
    this.getLatestData();
  }
  departmentName!: string;
  addDepartment() {
    console.log(this.departmentName);
    this.httpService.addDepartment(this.departmentName).subscribe(() => {
      alert('Thêm thành công');
      this.isFormOpen = false;
      this.getLatestData();
    });
  }
  editId = 0;
  editDepartment(department: IDepartment) {
    this.departmentName = department.name;
    this.isFormOpen = true;
    this.editId = department.id;
  }
  updateDepartment() {
    this.httpService
      .updateDepartment(this.editId, this.departmentName)
      .subscribe(() => {
        alert('Sửa thành công');
        this.isFormOpen = false;
        this.getLatestData();
        this.editId = 0;
      });
  }
  deleteDepartment(id: number) {
    this.httpService.deleteDepartment(id).subscribe(() => {
      alert('Xoá thành công');
      this.getLatestData();
    });
  }
  pageChange(event: any) {
    console.log(event);
    this.filter.pageIndex = event.pageIndex;
    this.getLatestData();
  }
}
