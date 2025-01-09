import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import the necessary PrimeNG modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button'; // If you're using pButton 

// Import your components
import { LanguageDropdownComponent } from './common/language-dropdown/language-dropdown.component';
import { RoleDropdownComponent } from './role-dropdown/role-dropdown.component';

@NgModule({
  declarations: [LanguageDropdownComponent, RoleDropdownComponent],
  imports: [
    AngularCommonModule,
    FormsModule,
    DialogModule,  // Add DialogModule here
    ButtonModule,  // Add ButtonModule if you use pButton
  ],
  exports: [
    LanguageDropdownComponent,
    AngularCommonModule,
    RoleDropdownComponent,
    DialogModule,  // Export DialogModule if you want to use it in other modules
    ButtonModule,  // Export ButtonModule if needed
  ]
})
export class SharedModule {}
