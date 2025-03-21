import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(user: { fullName: string, email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }
}