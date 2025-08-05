import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Departments } from './pages/departments/departments';
import { Employee } from './pages/employee/employee';
import { Login } from './pages/login/login';
import { EmployeeDashboard } from './pages/employee-dashboard/employee-dashvoard';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
    {path:"",component:Home},
    {path:"departments",component:Departments},
    {path:"employee",component:Employee},
    {path:"login",component:Login},
    {path:"employeeDashboard",component:EmployeeDashboard},
    {path:"profile",component:Profile}
];
