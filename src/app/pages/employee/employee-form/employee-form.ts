import { Component, inject, Input, input } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { IDepartment } from '../../../types/IDepartment';
import { HttpService } from '../../../services/http';
import { IEmployee } from '../../../types/IEmployee';
import {
  MAT_DIALOG_DATA,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-employee-form',
  imports: [
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm {
  fb = inject(FormBuilder);
  @Input() employeeId!: number;
  myForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    gender: ['1', Validators.required],
    departmentId: ['', Validators.required],
    jobTitle: ['', Validators.required],
    dob: [, Validators.required],
    joiningDate: [, Validators.required],
    lastWorkingDate: [''],
  });
  departments: IDepartment[] = [];
  httpService = inject(HttpService);
  ngOnInit() {
    this.httpService.getDepartments({}).subscribe((result) => {
      this.departments = result.data;
    });
    console.log('here', this.data);
    if (this.data?.employeeId) {
      this.httpService
        .getEmployeeId(this.data.employeeId)
        .subscribe((result) => {
          console.log(result);
          this.myForm.patchValue(result as any);
          this.myForm.get('gender')?.disable();
          this.myForm.get('joiningDate')?.disable();
          this.myForm.get('dob')?.disable();
        });
    } else {
    }
  }
  dialogRef = inject(MatDialogRef<EmployeeForm>);
  data = inject<any>(MAT_DIALOG_DATA);
  onSubmit() {
    if (this.data.employeeId) {
      let value: any = this.myForm.value;
      this.httpService
        .updateEmployeeId(this.data.employeeId, value)
        .subscribe(() => {
          alert('cap nhat thanh cong');
          this.dialogRef.close();
        });
    } else {
      let value: any = this.myForm.value;
      this.httpService.addEmployee(value).subscribe(() => {
        alert('Them thanh cong');
        this.dialogRef.close();
      });
    }
  }
}
