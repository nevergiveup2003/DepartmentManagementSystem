import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageData } from '../../types/page-data';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatCardModule, MatButtonModule, MatPaginatorModule,CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  @Input() pageData!: PageData<any>;
  @Input() displayedColumns: any[] = [];
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onPageChange = new EventEmitter<any>();
  @Output() rowLick = new EventEmitter<any>();
  @Input() pageIndex!: number;
  @Input() pageSize!: number;
  cols: any[] = [];
  ngOnInit() {
    this.cols = this.displayedColumns.map((x) => x.key || x);
  }
  edit(rowData: any) {
    this.onEdit.emit(rowData);
  }
  delete(rowData: any) {
    this.onDelete.emit(rowData);
  }
  pageChange(event: any) {
    console.log(event);
    this.onPageChange.emit(event);
  }
  onButtonClick(btn: string, rowData: any) {
    this.rowLick.emit({
      btn,
      rowData,
    });
  }
}
