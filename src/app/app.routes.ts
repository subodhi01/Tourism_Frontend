import { HomeComponent } from './components/homenew/home.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PlacesComponent } from '../app/components/places/places.component';
import { TourPackagesComponent } from '../app/components/tour-packages/tour-packages.component';


export const routes: Routes = [
  { path: 'auth/places', component: PlacesComponent },
  { path: 'auth/home', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'tour-packages/tour-packages', component: TourPackagesComponent },


  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: 'auth/login' } // Wildcard route
];

