import {  Input, Output, EventEmitter } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-role-dropdown',
    templateUrl: './role-dropdown.component.html',
    styleUrls: ['./role-dropdown.component.scss'],
    standalone: false
})

export class RoleDropdownComponent {
  @Input() selectedRole: string | null = null; // Default role is unselected
  @Output() selectedRoleChange = new EventEmitter<string>();

  dropdownVisible: boolean = false;

  // Role options
  roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'employee', label: 'Employee' },
    { value: 'other', label: 'Other' },
  ];

  // Toggle the visibility of the dropdown
  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

// RoleDropdownComponent TypeScript
onRoleChange(role: string): void {
  this.selectedRole = role; // Update the selected role
  this.selectedRoleChange.emit(role); // Emit the updated role to parent component
  this.dropdownVisible = false; // Close dropdown after selection
}

  // Get the label of the currently selected role
  getRoleLabel(roleCode: string | null): string {
    const role = this.roles.find((r) => r.value === roleCode);
    return role ? role.label : 'Select Role';
  }
}
