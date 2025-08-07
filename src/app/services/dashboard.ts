import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IDashboard } from '../types/dashboard';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {
  http = inject(HttpClient);
  constructor() {}

  getDashBoardData() {
   return this.http.get<IDashboard>(environment.apiUrl + '/api/Dashboard');
  }
}
