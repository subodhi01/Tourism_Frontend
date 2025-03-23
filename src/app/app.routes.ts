import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { PlacesComponent } from '../app/components/places/places.component';
import { UserProfileComponent } from './components/auth/userprofile/userprofile.component';
import { RequestBookingComponent } from './request-booking/request-booking.component';
=======

import { PlacesComponent } from '../app/components/places/places.component';
import { UserProfileComponent } from './components/auth/userprofile/userprofile.component';


>>>>>>> d27bad1 (subo2)
=======
import { PlacesComponent } from '../app/components/places/places.component';
import { UserProfileComponent } from './components/auth/userprofile/userprofile.component';
import { RequestBookingComponent } from './request-booking/request-booking.component';



>>>>>>> 61e58ac (subo3)




export const routes: Routes = [
  { path: 'auth/places', component: PlacesComponent },
  { path: 'request-booking', component: RequestBookingComponent },// Updated path
  { path: 'auth/home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/userprofile', component: UserProfileComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Default route
  { path: '', redirectTo: 'auth/login' } // Wildcard route
];
