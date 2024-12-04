import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageDropdownComponent } from './common/language-dropdown/language-dropdown.component';
import { RoleDropdownComponent } from './role-dropdown/role-dropdown.component';
@NgModule({
  declarations: [LanguageDropdownComponent,RoleDropdownComponent],
  imports: [AngularCommonModule, FormsModule],
  exports: [LanguageDropdownComponent, AngularCommonModule,RoleDropdownComponent]
})
export class SharedModule {}
