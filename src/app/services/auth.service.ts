<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  fullName: string;
  email: string;
  telephone: string;
  profilePhoto?: string;
}
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
>>>>>>> origin/dev

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  private apiUrl = 'https://localhost:44399/api';
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/auth/register`, data, { headers, withCredentials: true });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.user) {
            this.setUserData(response.user);
            // Store email separately for profile access
            localStorage.setItem('userEmail', response.user.email);
          }
        })
      );
  }

  verifyEmailOTP(email: string, otp: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/auth/verify-otp`, { email, otp }, { headers, withCredentials: true });
  }

  resendOTP(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/auth/resend-otp`, { email }, { headers, withCredentials: true });
  }

  setUserData(user: User | null) {
    this.userSubject.next(user);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userEmail', user.email);
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userEmail');
    }
  }

  getUserData(): User | null {
    return this.userSubject.value;
  }

  logout() {
    this.userSubject.next(null);
  }

  forgetPassword(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/auth/forget-password`, { email }, { headers, withCredentials: true });
  }

  verifyResetOTP(email: string, otp: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/auth/verify-reset-otp`, { email, otp }, { headers, withCredentials: true });
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/auth/reset-password`, { email, otp, newPassword }, { headers, withCredentials: true });
=======
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(user: { fullName: string, email: string, password: string }) {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
>>>>>>> origin/dev
  }
}