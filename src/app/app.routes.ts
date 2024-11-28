import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AdminGuard } from './admin.guard';
import { ManagerGuard } from './manager.guard';
import { EmployeeGuard } from './employee.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  
  // Protected dashboard routes
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'manager-dashboard', component: ManagerDashboardComponent, canActivate: [ManagerGuard] },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [EmployeeGuard] },
  
  // Fallback route for 404
  { path: '**', component: NotFoundComponent },
];
