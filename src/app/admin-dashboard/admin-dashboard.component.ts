import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isToggled: boolean = false; // Track the state of the sidebar
  isNavbarCollapsed: boolean = true; // Track the state of the navbar collapse
  activeItem: string = 'dashboard'; // Track the active navbar item (default to 'dashboard')
  
  constructor(private router: Router) {} // Inject Router

  // Toggle the sidebar's visibility
  toggleSidebar(): void {
    this.isToggled = !this.isToggled; // Toggle the sidebar state
  }

  // Toggle the navbar's collapsed state
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed; // Toggle the navbar state
  }

  // Set the active item based on the selected navbar or sidebar link
  setActiveItem(item: string): void {
    this.activeItem = item; // Update the active item to the selected one
    console.log(`Active item set to: ${item}`); // Debugging
  }

  // Method to sign out the user
  signOut(): void {
    this.router.navigate(['/login']); // Navigate to login
  }
}
