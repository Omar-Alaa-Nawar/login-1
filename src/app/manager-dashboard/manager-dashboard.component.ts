import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {
  isToggled: boolean = false; // Sidebar state
  isNavbarCollapsed: boolean = true; // Navbar collapse state
  activeItem: string = 'home'; // Active navigation item
  isSettingsDropdownOpen: boolean = false; // Track the state of settings dropdown

  constructor(private router: Router)  {}

  // Toggle the sidebar visibility
  toggleSidebar(): void {
    this.isToggled = !this.isToggled;
  }

  // Toggle navbar collapse state
  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // Update the active navigation item
  setActiveItem(item: string): void {
    this.activeItem = item;
  }

  // Toggle the settings dropdown visibility
  toggleSettingsDropdown(): void {
    this.isSettingsDropdownOpen = !this.isSettingsDropdownOpen;
  }

  // Sign out and navigate back to the login screen
  signOut(): void {
    this.router.navigate(['/login']);
  }
}
