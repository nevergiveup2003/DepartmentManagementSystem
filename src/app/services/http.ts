import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDepartment } from '../types/IDepartment';
import { IEmployee } from '../types/IEmployee';
import { environment } from '../../environments/environment.development';
import { PageData } from '../types/page-data';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);

  constructor() {}
  getDepartments(filter:any) {
    var params = new HttpParams({fromObject : filter})
    return this.http.get<PageData<IDepartment>>(environment.apiUrl + '/api/Department?' + params);
  }
  addDepartment(name: string) {
    return this.http.post(environment.apiUrl + '/api/Department', {
      name: name,
    });
  }
  updateDepartment(id: number, name: string) {
    return this.http.put(environment.apiUrl + '/api/Department/' + id, {
      name: name,
    });
  }
  deleteDepartment(id: number) {
    return this.http.delete(environment.apiUrl + '/api/Department/' + id);
  }
  getEmployeeList(filter:any) {
    var params = new HttpParams({fromObject: filter})
    return this.http.get<PageData<IEmployee>>(environment.apiUrl + '/api/Employee?' + params.toString());
  }
  addEmployee(employee: IEmployee) {
   return this.http.post(environment.apiUrl + '/api/Employee', employee);
  }
  getEmployeeId(id:number){
    return this.http.get<IEmployee>(environment.apiUrl + '/api/Employee/' + id)
  }
   updateEmployeeId(id:number,employee : IEmployee){
    return this.http.put(environment.apiUrl + '/api/Employee/' + id,employee)
  }
  deleteEmployeeId(id:number){
    return this.http.delete(environment.apiUrl + '/api/Employee/' + id)
  }
}
