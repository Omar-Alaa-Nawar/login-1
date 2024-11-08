import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole();  // Get the role from AuthService
    const url = state.url;

    console.log('RoleGuard Check:', role, 'Trying to access:', url);

    if (!this.authService.isAuthenticatedUser()) {
      console.log('User is not authenticated. Redirecting to login.');
      this.router.navigate(['/login']);
      return false;
    }

    // Authorization logic based on role
    if (role === 'admin') {
      // Admin can access any dashboard
      return true;
    } else if (role === 'manager') {
      // Manager can access manager-dashboard or employee-dashboard
      if (url.includes('manager-dashboard') || url.includes('employee-dashboard')) {
        return true;  // Grant access if URL matches manager or employee dashboard
      } else {
        // If the URL is not manager or employee dashboard, redirect to login
        this.router.navigate(['/login']);
        return false;
      }
    } else if (role === 'employee') {
      // Employee can only access employee-dashboard
      if (url.includes('employee-dashboard')) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    // If none of the conditions matched, redirect to login
    console.log('Access denied. Redirecting to login.');
    this.router.navigate(['/login']);
    return false;
  }
}
