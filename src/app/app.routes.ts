import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RoleGuard } from './role.guard';
import { NotFoundComponent } from './not-found/not-found.component'; // 404 component
import { ManagerGuard } from './manager.guard';
import { AdminGuard } from './admin.guard';
import { EmployeeGuard } from './employee.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  
  // Role-based guards on dashboards
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'manager-dashboard', component: ManagerDashboardComponent, canActivate: [ManagerGuard] },
  { path: 'employee-dashboard', component: EmployeeDashboardComponent, canActivate: [EmployeeGuard] },
  
  // 404 route for unrecognized paths
  { path: '**', component: NotFoundComponent },
];
