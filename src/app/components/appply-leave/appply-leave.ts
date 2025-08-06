import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Leave } from '../../services/leave';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-appply-leave',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './appply-leave.html',
  styleUrl: './appply-leave.scss',
})
export class AppplyLeave {
  fb = inject(FormBuilder);

  leaveForm = this.fb.group({
    type: [,[Validators.required]],
    leaveDate: [,[Validators.required]],
    reason: [],
  });
  leaveService = inject(Leave);
  dialogRef = inject(MatDialogRef<AppplyLeave>);

  onSubmit() {
    if(this.leaveForm.invalid){
      alert("hay dien va cung cap day du thong tin")
    }
    let leave: any = this.leaveForm.value;
    this.leaveService
      .applyLeave(leave.type, leave.reason, leave.date)
      .subscribe((result) => {
        alert('Leave applied');
        this.dialogRef.close()
      });
  }
}
