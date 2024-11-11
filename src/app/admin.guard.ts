import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = this.authService.getRole();
    const isAuthenticated = this.authService.isAuthenticatedUser();
    const url = state.url; // Get the current URL for logging purposes

    console.log('AdminGuard Check:', { role, isAuthenticated, url });

    if (isAuthenticated && role === 'admin') {
      // Admin can access admin-dashboard, manager-dashboard, or employee-dashboard
      if (url === '/admin-dashboard' || url === '/manager-dashboard' || url === '/employee-dashboard') {
        return true;  // Allow access to any dashboard for admins
      } else {
        // If accessing something else, redirect to 404 page
        console.log('Access denied. Redirecting to 404 page.');
        this.router.navigate(['/404']);
        return false;
      }
    }

    // If not authenticated or not an admin, deny access and redirect to 404
    console.log('Admin access denied. Redirecting to 404 page.');
    this.router.navigate(['/404']);
    return false;
  }
}
