import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: string;
  fullName: string;
  email: string;
  telephone: string;
  profilePhoto?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44399/api';
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Initialize user state from localStorage only in browser
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.userSubject.next(JSON.parse(storedUser));
      }
    }
  }

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
    if (isPlatformBrowser(this.platformId)) {
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userEmail', user.email);
      } else {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userEmail');
      }
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
  }
}