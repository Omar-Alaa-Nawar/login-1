import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { NgSelectModule } from '@ng-select/ng-select'; // Add this line
import { LeftSideComponent } from './shared/left-side/left-side.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // Make sure to import AppComponent here
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Corrected path


// AppModule no longer declares AppComponent or others; those are handled by bootstrapApplication
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule, // Add NgSelectModule here
    SharedModule,  // Import SharedModule to have LanguageDropdownComponent available
    LeftSideComponent, // Import LeftSideComponent
    DialogModule, // Import PrimeNG DialogModule
    ButtonModule, // Import PrimeNG ButtonModule
    BrowserAnimationsModule, // <-- Added for animations
  ],
  providers: [
     
  ],
})
export class AppModule {}

// Bootstrap using bootstrapApplication
bootstrapApplication(AppComponent);
