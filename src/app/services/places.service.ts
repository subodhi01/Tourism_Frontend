import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiUrl = 'https://localhost:44399/api/Places';

  constructor(private http: HttpClient) {}

  getAllPlaces(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPlacesByLocation(location: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?location=${location}`);
  }
}
