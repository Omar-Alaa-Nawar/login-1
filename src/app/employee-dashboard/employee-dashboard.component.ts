import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent {
  isToggled: boolean = false; // Sidebar state
  isNavbarCollapsed: boolean = true; // Navbar collapse state
  activeItem: string = 'home'; // Active item for navigation
  isSettingsDropdownOpen: boolean = false; // Dropdown state for settings

  constructor(private router: Router) {}

  // Toggle the sidebar visibility
  toggleSidebar(): void {
    this.isToggled = !this.isToggled;
  }

  // Toggle navbar collapse state
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // Update active item
  setActiveItem(item: string): void {
    this.activeItem = item;
    console.log(`Active item set to: ${item}`);
  }

  // Open or close settings dropdown
  toggleSettingsDropdown(event: MouseEvent): void {
    event.stopPropagation(); // Prevent event from bubbling up and triggering signOut
    this.isSettingsDropdownOpen = !this.isSettingsDropdownOpen;
  }

  // Sign out method
  signOut(): void {
    this.router.navigate(['/login']); // Navigate to login
  }
}
