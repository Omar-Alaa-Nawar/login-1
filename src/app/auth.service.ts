import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  authenticate() {
    localStorage.setItem('isAuthenticated', 'true');
    console.log('User authenticated');
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
    console.log('Role set:', role);
  }

  getRole(): string | null {
    const role = localStorage.getItem('role');
    console.log('Getting role:', role);
    return role;
  }

  isAuthenticatedUser(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    console.log('Checking authentication:', isAuthenticated);
    return isAuthenticated;
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
    console.log('User logged out');
  }
}
