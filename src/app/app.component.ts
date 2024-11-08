import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule here
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]  // Make sure RouterModule is in the imports array
})
export class AppComponent {
  title = 'HRMS Dashboard';

  constructor(private router: Router) {}

  // Handle logout and clear the localStorage
  onLogout() {
    localStorage.removeItem('role');  // Clear role from localStorage
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}
