import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common'; // Alias Angular's CommonModule
import { FormsModule } from '@angular/forms';
import { LanguageDropdownComponent } from './common/language-dropdown/language-dropdown.component';

@NgModule({
  declarations: [LanguageDropdownComponent],
  imports: [AngularCommonModule, FormsModule],
  exports: [LanguageDropdownComponent, AngularCommonModule] // Export AngularCommonModule if needed
})
export class SharedModule {}
