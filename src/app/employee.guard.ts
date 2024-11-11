import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole();
    const isAuthenticated = this.authService.isAuthenticatedUser();
    const url = state.url;

    console.log('EmployeeGuard Check:', { role, isAuthenticated, url });

    if (isAuthenticated && role === 'employee') {
      // Employee can access only the employee-dashboard
      if (url.includes('employee-dashboard')) {
        return true;
      } else {
        // Redirect to 404 page if access is denied to other dashboards
        console.log('Access denied. Redirecting to 404 page.');
        this.router.navigate(['/404']);
        return false;
      }
    }

    // If not authenticated or not an employee, deny access and redirect to 404
    console.log('Employee access denied. Redirecting to 404 page.');
    this.router.navigate(['/404']);
    return false;
  }
}
