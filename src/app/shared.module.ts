import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

import { LanguageDropdownComponent } from './common/language-dropdown/language-dropdown.component';
import { RoleDropdownComponent } from './role-dropdown/role-dropdown.component';

@NgModule({
  declarations: [
    LanguageDropdownComponent,
    RoleDropdownComponent,
  ],
  imports: [
    AngularCommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
  ],
  exports: [
    LanguageDropdownComponent,
    RoleDropdownComponent,
    AngularCommonModule,
    FormsModule,
    DialogModule,
    ButtonModule,
  ],
})
export class SharedModule {}
