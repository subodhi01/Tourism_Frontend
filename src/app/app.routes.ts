import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
<<<<<<< HEAD

import { PlacesComponent } from '../app/components/places/places.component';
import { UserProfileComponent } from './components/auth/userprofile/userprofile.component';


=======
import { PlacesComponent } from '../app/components/places/places.component';

import { UserProfileComponent } from './components/auth/userprofile/userprofile.component';



import { RequestBookingComponent } from './request-booking/request-booking.component';
>>>>>>> 22b85982f9f64228f0debd4a43a89187ccca472e

export const routes: Routes = [
  { path: 'auth/places', component: PlacesComponent },
  { path: 'request-booking', component: RequestBookingComponent },// Updated path
  { path: 'auth/home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/userprofile', component: UserProfileComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'auth/login' } // Wildcard route
];
