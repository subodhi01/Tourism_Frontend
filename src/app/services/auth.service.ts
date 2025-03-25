import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

interface User {
  id: string;
  fullName: string;
  email: string;
  telephone: string;
  profilePhoto?: string;
}

interface LoginResponse {
  user: User;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'https://localhost:44399/api';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        console.log('Found user in localStorage:', user);
        this.currentUserSubject.next(JSON.parse(user));
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    console.log('Attempting login with:', { email });
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: true
    }).pipe(
      tap(response => {
        console.log('Login response received:', response);
        if (response && response.user) {
          this.setUserData(response.user);
        }
      })
    );
  }

  setUserData(user: User): void {
    console.log('Setting user data:', user);
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  logout(): void {
    console.log('Logging out user');
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const isLoggedIn = !!this.currentUserSubject.value;
    console.log('Checking if logged in:', isLoggedIn);
    return isLoggedIn;
  }

  getCurrentUser(): User | null {
    const user = this.currentUserSubject.value;
    console.log('Getting current user:', user);
    return user;
  }
}