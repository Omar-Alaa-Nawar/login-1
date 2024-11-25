import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared.module';
import { LeftSideComponent } from './shared/left-side/left-side.component'; // Import LeftSideComponent

@NgModule({
  declarations: [
    AppComponent,
    ResetPasswordComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SharedModule,
    LeftSideComponent // Directly import LeftSideComponent here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
