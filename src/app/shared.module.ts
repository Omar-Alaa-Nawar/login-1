import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageDropdownComponent } from './common/language-dropdown/language-dropdown.component';

@NgModule({
  declarations: [LanguageDropdownComponent],
  imports: [AngularCommonModule, FormsModule],
  exports: [LanguageDropdownComponent, AngularCommonModule]
})
export class SharedModule {}
