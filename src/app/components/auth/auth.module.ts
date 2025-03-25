import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from '../home/home.component';
import { UserProfileComponent } from './userprofile/userprofile.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

export const routes: Routes = [
  { path: 'auth/home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/userprofile', component: UserProfileComponent },
  { path: 'auth/otp-verification', component: OtpVerificationComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'auth/login' } // Wildcard route
];
