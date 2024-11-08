import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
