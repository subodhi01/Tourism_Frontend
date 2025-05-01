import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { VerifyResetOtpComponent } from './components/auth/verify-reset-otp/verify-reset-otp.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    VerifyResetOtpComponent,
    ResetPasswordComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { } 