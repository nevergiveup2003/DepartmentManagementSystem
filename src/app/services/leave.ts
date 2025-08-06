import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PageData } from '../types/page-data';
import { ILeave } from '../types/leave';

@Injectable({
  providedIn: 'root',
})
export class Leave {
  http = inject(HttpClient);
  constructor() {}
  applyLeave(type: number, reason: string, date: string) {
    return this.http.post(environment.apiUrl + '/api/Leave/apply', {
      type,
      reason,
      leaveDate: date,
    });
  }
  getLeaves(filter:any){
    var params = new HttpParams({fromObject : filter})
    return this.http.get<PageData<ILeave>>(environment.apiUrl + '/api/Leave?' + params.toString())
  }
  updateLeaveStatus(id:number,status:number){
    return this.http.post(environment.apiUrl + '/api/Leave/updateStatus',{
      id,status,
    });
  }
}
