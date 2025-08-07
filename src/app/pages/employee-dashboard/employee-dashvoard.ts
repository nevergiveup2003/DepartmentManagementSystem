import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppplyLeave } from '../../components/appply-leave/appply-leave';
import { MatDialog } from '@angular/material/dialog';
import { Leave } from '../../services/leave';

@Component({
  selector: 'app-employee-dashvoard',
  imports: [MatCardModule, MatCardModule, MatButtonModule],
  templateUrl: './employee-dashvoard.html',
  styleUrl: './employee-dashvoard.scss',
})
export class EmployeeDashboard {
  applyLeave() {
    this.openDialog();
  }
  readonly dialog = inject(MatDialog);
  openDialog(): void {
    let ref = this.dialog.open(AppplyLeave, {
      panelClass: 'm-auto',
      data: {},
    });
    ref.afterClosed().subscribe((result) => {});
  }
  leaveService = inject(Leave);
  markAttendance() {
    this.leaveService.markPresent().subscribe({
      next: (result) => {
        alert('Your are marked present for today');
      },
      error:(e:any)=>{
        console.log(e);
        alert(e.error)
      }
    });
  }
}
