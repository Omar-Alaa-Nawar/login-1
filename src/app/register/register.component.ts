import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  step: number = 1; // Tracks the current step of the registration process
  registerData = {
    name: '',
    email: '',
    company: '',
    role: '',
    employees: '',
    industry: '',
    password: '',
    confirmPassword: ''
  };
  
  constructor(private router: Router) {}
  nextStep() {
    if (this.step === 1) {
      if (this.registerData.name && this.registerData.email && this.registerData.company && this.registerData.role) {
        this.step++;
      } else {
        alert('Please fill all fields in Step 1.');
      }
    } else if (this.step === 2) {
      if (this.registerData.employees && this.registerData.industry) {
        this.step++;
      } else {
        alert('Please fill all fields in Step 2.');
      }
    } else if (this.step === 3) {
      if (this.registerData.password === this.registerData.confirmPassword) {
        if (this.isEmailRegistered(this.registerData.email)) {
          alert('This email is already registered. Please use a different email.');
        } else {
          this.register(); // Save to local storage when the last step is valid
        }
      } else {
        alert('Passwords do not match. Please try again.');
      }
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  register() {
    console.log("Registration process started.");
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    existingUsers.push(this.registerData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
  
    console.log("Registration successful. Navigating to login.");
    alert('Registration successful! Your information has been saved.');
    this.router.navigate(['/login']);
  }
  
  
  

  isEmailRegistered(email: string): boolean {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if the email matches any user's email
    return existingUsers.some((user: { email: string }) => user.email === email);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}