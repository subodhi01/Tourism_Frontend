import { Routes } from '@angular/router';
import { Component } from '@angular/core';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';
import { VerifyResetOtpComponent } from './components/auth/verify-reset-otp/verify-reset-otp.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { UserProfileComponent } from './components/auth/userprofile/userprofile.component';

import { HomeComponent } from './components/homenew/home.component'; // use homenew version
import { PlacesComponent } from './components/places/places.component';
import { TourPackagesComponent } from './components/tour-packages/tour-packages.component';
//import { RequestBookingComponent } from './request-booking/request-booking.component';
//import { ReviewScreenComponent } from './pages/review-screen/review-screen.component';
//import { ReviewsComponent } from './components/reviews/reviews.component';

// Optional: Uncomment and use if route protection is needed
// import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/forget-password', component: ForgetPasswordComponent },
  { path: 'auth/verify-reset-otp', component: VerifyResetOtpComponent },
  { path: 'auth/reset-password', component: ResetPasswordComponent },
  { path: 'auth/userprofile', component: UserProfileComponent },
  { path: 'auth/home', component: HomeComponent },
  { path: 'auth/places', component: PlacesComponent },
  { path: 'tour-packages/tour-packages', component: TourPackagesComponent },
  //{ path: 'request-booking', component: RequestBookingComponent },
 // { path: 'reviews/:type/:itemId', component: ReviewsComponent },
  //{ path: 'reviews', component: ReviewScreenComponent },
  
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'auth/login' } // Wildcard route
];
