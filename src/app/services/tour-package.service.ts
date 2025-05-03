import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TourPackage {
  packageID: number;
  packageName: string;
  description: string;
  price: number;
  durationDays: number;
  place: string;
  createdAt: string;
  updatedAt: string;
  plans?: UserPlan[];
  activities?: Activity[];
}

export interface UserPlan {
  planId: number;
  packageId: number;
  userId: number;
  planName: string;
  description: string;
  startDate: string;
  endDate: string;
  activities: Activity[];
  createdAt: string;
}

export interface Activity {
  activityId: number;
  name: string;
  description: string;
  location: string;
  duration: number; // in hours
  price: number;
  category: 'cultural' | 'adventure' | 'relaxation' | 'food' | 'shopping';
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  private apiUrl = 'https://localhost:44399/api/TourPackage';

  constructor(private http: HttpClient) { }

  getTourPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(this.apiUrl);
  }

  addUserPlan(plan: Omit<UserPlan, 'planId' | 'createdAt'>): Observable<UserPlan> {
    return this.http.post<UserPlan>(`${this.apiUrl}/plans`, plan);
  }

  getUserPlans(userId: number): Observable<UserPlan[]> {
    return this.http.get<UserPlan[]>(`${this.apiUrl}/plans/user/${userId}`);
  }

  generateActivities(location: string, preferences: string[]): Observable<Activity[]> {
    return this.http.post<Activity[]>(`${this.apiUrl}/activities/generate`, {
      location,
      preferences
    });
  }

  getActivitiesByCategory(category: string): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/activities/category/${category}`);
  }
}
