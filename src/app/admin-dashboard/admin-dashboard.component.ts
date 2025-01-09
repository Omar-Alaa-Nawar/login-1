import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ModalComponent } from '../shared/modal/modal.component'; // Import the ModalComponent

@Component({
    selector: 'app-admin-dashboard',
    imports: [CommonModule, RouterModule, ModalComponent],  // Add ModalComponent to imports
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  isToggled: boolean = false;
  isNavbarCollapsed: boolean = true;
  activeItem: string = 'dashboard';

  // Modal visibility flag
  showModal: boolean = false;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isToggled = !this.isToggled;
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  setActiveItem(item: string): void {
    this.activeItem = item;
    console.log(`Active item set to: ${item}`);
  }

  signOut(): void {
    this.router.navigate(['/login']);
  }

  // Open the modal
  openModal() {
    this.showModal = true;
  }

  // Handle cancel action
  onCancel() {
    this.showModal = false;
    console.log('Action canceled');
  }

  // Handle confirm action
  onConfirm() {
    this.showModal = false;
    console.log('Action confirmed');
  }
}
