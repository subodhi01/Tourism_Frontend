import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';

export interface TourPackage {
  packageID: number;
  packageName: string;
  description: string;
  price: number;
  durationDays: number;
  place: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class TourPackageService {
  private apiUrl = `${environment.apiUrl}/TourPackage`;

  constructor(private http: HttpClient) { }

  getTourPackages(): Observable<TourPackage[]> {
    return this.http.get<TourPackage[]>(this.apiUrl);
  }
}
