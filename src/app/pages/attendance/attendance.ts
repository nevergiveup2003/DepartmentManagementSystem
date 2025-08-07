import { Component, inject, OnInit } from '@angular/core';
import { Table } from '../../components/table/table';
import { Leave } from '../../services/leave';
import { PageData } from '../../types/page-data';
import { AttendanceType, IAttendance } from '../../types/attendance';
import { authService } from '../../services/auth';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  imports: [Table, CommonModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.scss',
})
export class Attendance implements OnInit {
  filter = {
    pageIndex: 0,
    pageSize: 5,
    employeeId: '',
  };

  showCols: any[] = [
    {
      key: 'date',
      format: (rowData: IAttendance) => {
        let date = new Date(rowData.date);
        return (
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear()
        );
      },
    },
    {
      key: 'type',
      format: (rowData: IAttendance) => {
        switch (rowData.type) {
          case AttendanceType.Leave:
            return 'Leave';
          case AttendanceType.Present:
            return 'Present';
          default:
            return 'Unknown';
        }
      },
    },
  ];

  leaveService = inject(Leave);
  route = inject(ActivatedRoute);
  authService = inject(authService);
  employeeId!: string | null;

  data!: PageData<IAttendance>;

  ngOnInit() {
    this.employeeId = this.authService.authDetail?.id?.toString() || null;

    if (this.employeeId) {
      this.filter.employeeId = this.employeeId;
      this.getLatestData();
    } else {
      console.error('User not logged in or missing ID!');
      this.authService.logout();
    }
  }

  getLatestData() {
    this.filter.employeeId = this.employeeId as string;
    this.leaveService.getAttendanceHistory(this.filter).subscribe((result) => {
      this.data = result;
    });
  }

  pageChange(event: any) {
    this.filter.pageIndex = event.pageIndex;
    this.getLatestData();
  }
}
