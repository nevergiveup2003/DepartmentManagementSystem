import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Leave } from '../../services/leave';
import { PageData } from '../../types/page-data';
import { ILeave, LeaveStatus, LeaveType } from '../../types/leave';
import { Table } from '../../components/table/table';
import { authService } from '../../services/auth';

@Component({
  selector: 'app-leaves',
  imports: [Table],
  templateUrl: './leaves.html',
  styleUrl: './leaves.scss',
})
export class Leaves {
  showCols = [
    'id',
    {
      key: 'type',
      format: (rowData: ILeave) => {
        switch (rowData.type) {
          case LeaveType.Casual:
            return 'Casual leave';
          case LeaveType.Sick:
            return 'Sick leave';
          case LeaveType.Earned:
            return 'Earned leave';
        }
      },
    },
    'reason',
    'leaveDate',
    {
      key: 'status',
      format: (rowData: ILeave) => {
        switch (rowData.status) {
          case LeaveStatus.Pending:
            return 'Pending';
          case LeaveStatus.Accepted:
            return 'Accepted';
          case LeaveStatus.Canelled:
            return 'Canelled';
          case LeaveStatus.Rejected:
            return 'Rejected';
        }
      },
    },
    {
      key: 'action',
      format: (rowData: ILeave) => {
        if (this.authService.isEmployee) {
          if (rowData.status == LeaveStatus.Pending) {
            return ['Cancel'];
          } else [];
        } else if (rowData.status == LeaveStatus.Pending) {
          return ['Reject', 'Accept'];
        }
        return [];
      },
    },
  ];
  leaveService = inject(Leave);
  authService = inject(authService);
  filter = {
    pageIndex: 0,
    pageSize: 5,
  };
  ngOnInit() {
    this.getLeavesData();
  }
  data!: PageData<ILeave>;
  getLeavesData() {
    this.leaveService.getLeaves(this.filter).subscribe((result) => {
      this.data = result;
      console.log(this.data);
    });
  }
  pageChange(event: any) {
    console.log(event);
    this.filter.pageIndex = event.pageIndex;
    this.getLeavesData();
  }
  onRowClick(event: any) {
    console.log(event);
    switch (event.btn) {
      case 'Cancel':
        this.leaveService
          .updateLeaveStatus(event.rowData.id, LeaveStatus.Canelled)
          .subscribe(() => {
            this.getLeavesData();
          });
        break;
      case 'Accept':
        this.leaveService
          .updateLeaveStatus(event.rowData.id, LeaveStatus.Accepted)
          .subscribe(() => {
            this.getLeavesData();
          });
        break;
      case 'Rejected':
        this.leaveService
          .updateLeaveStatus(event.rowData.id, LeaveStatus.Rejected)
          .subscribe(() => {
            this.getLeavesData();
          });
        break;
    }
  }
}
