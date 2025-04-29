// // // // // // // // // import { HttpClient } from '@angular/common/http';
// // // // // // // // // import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
// // // // // // // // // import { BehaviorSubject, Observable } from 'rxjs';
// // // // // // // // // import { tap } from 'rxjs/operators';
// // // // // // // // // import { isPlatformBrowser } from '@angular/common';

// // // // // // // // // interface User {
// // // // // // // // //   id: string;
// // // // // // // // //   fullName: string;
// // // // // // // // //   email: string;
// // // // // // // // //   telephone: string;
// // // // // // // // //   profilePhoto?: string;
// // // // // // // // // }

// // // // // // // // // interface LoginResponse {
// // // // // // // // //   user: User;
// // // // // // // // //   token?: string;
// // // // // // // // // }

// // // // // // // // // @Injectable({
// // // // // // // // //   providedIn: 'root'
// // // // // // // // // })
// // // // // // // // // export class AuthService {
// // // // // // // // //   private currentUserSubject = new BehaviorSubject<User | null>(null);
// // // // // // // // //   public currentUser$ = this.currentUserSubject.asObservable();
// // // // // // // // //   private apiUrl = 'https://localhost:44399/api';
// // // // // // // // //   private isBrowser: boolean;

// // // // // // // // //   constructor(
// // // // // // // // //     private http: HttpClient,
// // // // // // // // //     @Inject(PLATFORM_ID) platformId: Object
// // // // // // // // //   ) {
// // // // // // // // //     this.isBrowser = isPlatformBrowser(platformId);
// // // // // // // // //     if (this.isBrowser) {
// // // // // // // // //       const user = localStorage.getItem('currentUser');
// // // // // // // // //       if (user) {
// // // // // // // // //         console.log('Found user in localStorage:', user);
// // // // // // // // //         this.currentUserSubject.next(JSON.parse(user));
// // // // // // // // //       }
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   login(email: string, password: string): Observable<LoginResponse> {
// // // // // // // // //     console.log('Attempting login with:', { email });
// // // // // // // // //     return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }, {
// // // // // // // // //       headers: {
// // // // // // // // //         'Content-Type': 'application/json',
// // // // // // // // //         'Accept': 'application/json'
// // // // // // // // //       },
// // // // // // // // //       withCredentials: true
// // // // // // // // //     }).pipe(
// // // // // // // // //       tap(response => {
// // // // // // // // //         console.log('Login response received:', response);
// // // // // // // // //         if (response && response.user) {
// // // // // // // // //           this.setUserData(response.user);
// // // // // // // // //         }
// // // // // // // // //       })
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   setUserData(user: User): void {
// // // // // // // // //     console.log('Setting user data:', user);
// // // // // // // // //     if (this.isBrowser) {
// // // // // // // // //       localStorage.setItem('currentUser', JSON.stringify(user));
// // // // // // // // //     }
// // // // // // // // //     this.currentUserSubject.next(user);
// // // // // // // // //   }

// // // // // // // // //   logout(): void {
// // // // // // // // //     console.log('Logging out user');
// // // // // // // // //     if (this.isBrowser) {
// // // // // // // // //       localStorage.removeItem('currentUser');
// // // // // // // // //     }
// // // // // // // // //     this.currentUserSubject.next(null);
// // // // // // // // //   }

// // // // // // // // //   isLoggedIn(): boolean {
// // // // // // // // //     const isLoggedIn = !!this.currentUserSubject.value;
// // // // // // // // //     console.log('Checking if logged in:', isLoggedIn);
// // // // // // // // //     return isLoggedIn;
// // // // // // // // //   }

// // // // // // // // //   getCurrentUser(): User | null {
// // // // // // // // //     const user = this.currentUserSubject.value;
// // // // // // // // //     console.log('Getting current user:', user);
// // // // // // // // //     return user;
// // // // // // // // //   }
// // // // // // // // // }
// // // // // // // // import { HttpClient } from '@angular/common/http';
// // // // // // // // import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
// // // // // // // // import { BehaviorSubject, Observable } from 'rxjs';
// // // // // // // // import { tap } from 'rxjs/operators';
// // // // // // // // import { isPlatformBrowser } from '@angular/common';

// // // // // // // // interface User {
// // // // // // // //   id: string;
// // // // // // // //   fullName: string;
// // // // // // // //   email: string;
// // // // // // // //   telephone: string;
// // // // // // // //   profilePhoto?: string;
// // // // // // // // }

// // // // // // // // interface LoginResponse {
// // // // // // // //   user: User;
// // // // // // // //   token?: string;
// // // // // // // // }

// // // // // // // // @Injectable({
// // // // // // // //   providedIn: 'root'
// // // // // // // // })
// // // // // // // // export class AuthService {
// // // // // // // //   private currentUserSubject = new BehaviorSubject<User | null>(null);
// // // // // // // //   public currentUser$ = this.currentUserSubject.asObservable();
// // // // // // // //   private apiUrl = 'https://localhost:44399/api';
// // // // // // // //   private isBrowser: boolean;

// // // // // // // //   constructor(
// // // // // // // //     private http: HttpClient,
// // // // // // // //     @Inject(PLATFORM_ID) platformId: Object
// // // // // // // //   ) {
// // // // // // // //     this.isBrowser = isPlatformBrowser(platformId);
// // // // // // // //     if (this.isBrowser) {
// // // // // // // //       const user = localStorage.getItem('currentUser');
// // // // // // // //       if (user) {
// // // // // // // //         console.log('Found user in localStorage:', user);
// // // // // // // //         this.currentUserSubject.next(JSON.parse(user));
// // // // // // // //       }
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   login(email: string, password: string): Observable<LoginResponse> {
// // // // // // // //     console.log('Attempting login with:', { email });
// // // // // // // //     return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }, {
// // // // // // // //       headers: {
// // // // // // // //         'Content-Type': 'application/json',
// // // // // // // //         'Accept': 'application/json'
// // // // // // // //       },
// // // // // // // //       withCredentials: true
// // // // // // // //     }).pipe(
// // // // // // // //       tap(response => {
// // // // // // // //         console.log('Login response received:', response);
// // // // // // // //         if (response && response.user) {
// // // // // // // //           this.setUserData(response.user);
// // // // // // // //         }
// // // // // // // //       })
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   verifyEmailOTP(email: string, otp: string): Observable<any> {
// // // // // // // //     return this.http.post(`${this.apiUrl}/auth/verify-email`, { email, otp }, {
// // // // // // // //       headers: {
// // // // // // // //         'Content-Type': 'application/json',
// // // // // // // //         'Accept': 'application/json'
// // // // // // // //       },
// // // // // // // //       withCredentials: true
// // // // // // // //     });
// // // // // // // //   }

// // // // // // // //   resendOTP(email: string): Observable<any> {
// // // // // // // //     return this.http.post(`${this.apiUrl}/auth/resend-otp`, { email }, {
// // // // // // // //       headers: {
// // // // // // // //         'Content-Type': 'application/json',
// // // // // // // //         'Accept': 'application/json'
// // // // // // // //       },
// // // // // // // //       withCredentials: true
// // // // // // // //     });
// // // // // // // //   }

// // // // // // // //   setUserData(user: User): void {
// // // // // // // //     console.log('Setting user data:', user);
// // // // // // // //     if (this.isBrowser) {
// // // // // // // //       localStorage.setItem('currentUser', JSON.stringify(user));
// // // // // // // //     }
// // // // // // // //     this.currentUserSubject.next(user);
// // // // // // // //   }

// // // // // // // //   logout(): void {
// // // // // // // //     console.log('Logging out user');
// // // // // // // //     if (this.isBrowser) {
// // // // // // // //       localStorage.removeItem('currentUser');
// // // // // // // //     }
// // // // // // // //     this.currentUserSubject.next(null);
// // // // // // // //   }

// // // // // // // //   isLoggedIn(): boolean {
// // // // // // // //     const isLoggedIn = !!this.currentUserSubject.value;
// // // // // // // //     console.log('Checking if logged in:', isLoggedIn);
// // // // // // // //     return isLoggedIn;
// // // // // // // //   }

// // // // // // // //   getCurrentUser(): User | null {
// // // // // // // //     const user = this.currentUserSubject.value;
// // // // // // // //     console.log('Getting current user:', user);
// // // // // // // //     return user;
// // // // // // // //   }
// // // // // // // // }
// // // // // // // import { HttpClient } from '@angular/common/http';
// // // // // // // import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
// // // // // // // import { BehaviorSubject, Observable } from 'rxjs';
// // // // // // // import { tap } from 'rxjs/operators';
// // // // // // // import { isPlatformBrowser } from '@angular/common';

// // // // // // // interface User {
// // // // // // //   id: string;
// // // // // // //   fullName: string;
// // // // // // //   email: string;
// // // // // // //   telephone: string;
// // // // // // //   profilePhoto?: string;
// // // // // // // }

// // // // // // // interface LoginResponse {
// // // // // // //   user: User;
// // // // // // //   token?: string;
// // // // // // // }

// // // // // // // @Injectable({
// // // // // // //   providedIn: 'root'
// // // // // // // })
// // // // // // // export class AuthService {
// // // // // // //   private currentUserSubject = new BehaviorSubject<User | null>(null);
// // // // // // //   public currentUser$ = this.currentUserSubject.asObservable();
// // // // // // //   private apiUrl = 'https://localhost:44399/api';
// // // // // // //   private isBrowser: boolean;

// // // // // // //   constructor(
// // // // // // //     private http: HttpClient,
// // // // // // //     @Inject(PLATFORM_ID) platformId: Object
// // // // // // //   ) {
// // // // // // //     this.isBrowser = isPlatformBrowser(platformId);
// // // // // // //     if (this.isBrowser) {
// // // // // // //       const user = localStorage.getItem('currentUser');
// // // // // // //       if (user) {
// // // // // // //         console.log('Found user in localStorage:', user);
// // // // // // //         this.currentUserSubject.next(JSON.parse(user));
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }

// // // // // // //   login(email: string, password: string): Observable<LoginResponse> {
// // // // // // //     console.log('Attempting login with:', { email });
// // // // // // //     return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }, {
// // // // // // //       headers: {
// // // // // // //         'Content-Type': 'application/json',
// // // // // // //         'Accept': 'application/json'
// // // // // // //       },
// // // // // // //       withCredentials: true
// // // // // // //     }).pipe(
// // // // // // //       tap(response => {
// // // // // // //         console.log('Login response received:', response);
// // // // // // //         if (response && response.user) {
// // // // // // //           this.setUserData(response.user);
// // // // // // //         }
// // // // // // //       })
// // // // // // //     );
// // // // // // //   }

// // // // // // //   verifyEmailOTP(email: string, otp: string): Observable<any> {
// // // // // // //     return this.http.post(`${this.apiUrl}/auth/verify-email`, { email, otp }, {
// // // // // // //       headers: {
// // // // // // //         'Content-Type': 'application/json',
// // // // // // //         'Accept': 'application/json'
// // // // // // //       },
// // // // // // //       withCredentials: true
// // // // // // //     });
// // // // // // //   }

// // // // // // //   resendOTP(email: string): Observable<any> {
// // // // // // //     return this.http.post(`${this.apiUrl}/auth/resend-otp`, { email }, {
// // // // // // //       headers: {
// // // // // // //         'Content-Type': 'application/json',
// // // // // // //         'Accept': 'application/json'
// // // // // // //       },
// // // // // // //       withCredentials: true
// // // // // // //     });
// // // // // // //   }

// // // // // // //   setUserData(user: User): void {
// // // // // // //     console.log('Setting user data:', user);
// // // // // // //     if (this.isBrowser) {
// // // // // // //       localStorage.setItem('currentUser', JSON.stringify(user));
// // // // // // //     }
// // // // // // //     this.currentUserSubject.next(user);
// // // // // // //   }

// // // // // // //   logout(): void {
// // // // // // //     console.log('Logging out user');
// // // // // // //     if (this.isBrowser) {
// // // // // // //       localStorage.removeItem('currentUser');
// // // // // // //     }
// // // // // // //     this.currentUserSubject.next(null);
// // // // // // //   }

// // // // // // //   isLoggedIn(): boolean {
// // // // // // //     const isLoggedIn = !!this.currentUserSubject.value;
// // // // // // //     console.log('Checking if logged in:', isLoggedIn);
// // // // // // //     return isLoggedIn;
// // // // // // //   }

// // // // // // //   getCurrentUser(): User | null {
// // // // // // //     const user = this.currentUserSubject.value;
// // // // // // //     console.log('Getting current user:', user);
// // // // // // //     return user;
// // // // // // //   }
// // // // // // // }

// // // // // // import { Injectable } from '@angular/core';
// // // // // //      import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // // // //      import { Observable } from 'rxjs';
// // // // // //      import { tap } from 'rxjs/operators';

// // // // // //      @Injectable({
// // // // // //        providedIn: 'root'
// // // // // //      })
// // // // // //      export class AuthService {
// // // // // //        private apiUrl = 'https://localhost:44399/api';
// // // // // //        private userData: any = null;

// // // // // //        constructor(private http: HttpClient) { }

// // // // // //        login(email: string, password: string): Observable<any> {
// // // // // //          const headers = new HttpHeaders({
// // // // // //            'Content-Type': 'application/json',
// // // // // //            'Accept': 'application/json'
// // // // // //          });

// // // // // //          return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, { headers, withCredentials: true })
// // // // // //            .pipe(
// // // // // //              tap((response: any) => {
// // // // // //                if (response && response.user) {
// // // // // //                  this.userData = response.user;
// // // // // //                }
// // // // // //              })
// // // // // //            );
// // // // // //        }

// // // // // //        verifyEmailOTP(email: string, otp: string): Observable<any> {
// // // // // //          const headers = new HttpHeaders({
// // // // // //            'Content-Type': 'application/json',
// // // // // //            'Accept': 'application/json'
// // // // // //          });

// // // // // //          return this.http.post(`${this.apiUrl}/auth/verify-otp`, { email, otp }, { headers, withCredentials: true });
// // // // // //        }

// // // // // //        resendOTP(email: string): Observable<any> {
// // // // // //          const headers = new HttpHeaders({
// // // // // //            'Content-Type': 'application/json',
// // // // // //            'Accept': 'application/json'
// // // // // //          });

// // // // // //          return this.http.post(`${this.apiUrl}/auth/resend-otp`, { email }, { headers, withCredentials: true });
// // // // // //        }

// // // // // //        setUserData(user: any) {
// // // // // //          this.userData = user;
// // // // // //        }

// // // // // //        getUserData() {
// // // // // //          return this.userData;
// // // // // //        }

// // // // // //        logout() {
// // // // // //          this.userData = null;
// // // // // //        }
// // // // // //      }
// // // // // import { Injectable } from '@angular/core';
// // // // //      import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // // //      import { BehaviorSubject, Observable } from 'rxjs';
// // // // //      import { tap } from 'rxjs/operators';

// // // // //      export interface User {
// // // // //        id: string;
// // // // //        fullName: string;
// // // // //        email: string;
// // // // //        telephone: string;
// // // // //        profilePhoto?: string;
// // // // //      }

// // // // //      @Injectable({
// // // // //        providedIn: 'root'
// // // // //      })
// // // // //      export class AuthService {
// // // // //        private apiUrl = 'https://localhost:44399/api';
// // // // //        private userSubject = new BehaviorSubject<User | null>(null);
// // // // //        currentUser$: Observable<User | null> = this.userSubject.asObservable();

// // // // //        constructor(private http: HttpClient) { }

// // // // //        login(email: string, password: string): Observable<any> {
// // // // //          const headers = new HttpHeaders({
// // // // //            'Content-Type': 'application/json',
// // // // //            'Accept': 'application/json'
// // // // //          });

// // // // //          return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, { headers, withCredentials: true })
// // // // //            .pipe(
// // // // //              tap((response: any) => {
// // // // //                if (response && response.user) {
// // // // //                  this.userSubject.next(response.user);
// // // // //                }
// // // // //              })
// // // // //            );
// // // // //        }

// // // // //        verifyEmailOTP(email: string, otp: string): Observable<any> {
// // // // //          const headers = new HttpHeaders({
// // // // //            'Content-Type': 'application/json',
// // // // //            'Accept': 'application/json'
// // // // //          });

// // // // //          return this.http.post(`${this.apiUrl}/auth/verify-otp`, { email, otp }, { headers, withCredentials: true });
// // // // //        }

// // // // //        resendOTP(email: string): Observable<any> {
// // // // //          const headers = new HttpHeaders({
// // // // //            'Content-Type': 'application/json',
// // // // //            'Accept': 'application/json'
// // // // //          });

// // // // //          return this.http.post(`${this.apiUrl}/auth/resend-otp`, { email }, { headers, withCredentials: true });
// // // // //        }

// // // // //        setUserData(user: User | null) {
// // // // //          this.userSubject.next(user);
// // // // //        }

// // // // //        getUserData(): User | null {
// // // // //          return this.userSubject.value;
// // // // //        }

// // // // //        logout() {
// // // // //          this.userSubject.next(null);
// // // // //        }
// // // // //      }
// // // // import { Injectable } from '@angular/core';
// // // // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // // // import { BehaviorSubject, Observable } from 'rxjs';
// // // // import { tap } from 'rxjs/operators';

// // // // export interface User {
// // // //   id: string;
// // // //   fullName: string;
// // // //   email: string;
// // // //   telephone: string;
// // // //   profilePhoto?: string;
// // // // }

// // // // @Injectable({
// // // //   providedIn: 'root'
// // // // })
// // // // export class AuthService {
// // // //   private apiUrl = 'https://localhost:44399/api';
// // // //   private userSubject = new BehaviorSubject<User | null>(null);
// // // //   currentUser$: Observable<User | null> = this.userSubject.asObservable();

// // // //   constructor(private http: HttpClient) { }

// // // //   login(email: string, password: string): Observable<any> {
// // // //     const headers = new HttpHeaders({
// // // //       'Content-Type': 'application/json',
// // // //       'Accept': 'application/json'
// // // //     });

// // // //     return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, { headers, withCredentials: true })
// // // //       .pipe(
// // // //         tap((response: any) => {
// // // //           if (response && response.user) {
// // // //             this.userSubject.next(response.user);
// // // //           }
// // // //         })
// // // //       );
// // // //   }

// // // //   verifyEmailOTP(email: string, otp: string): Observable<any> {
// // // //     const headers = new HttpHeaders({
// // // //       'Content-Type': 'application/json',
// // // //       'Accept': 'application/json'
// // // //     });

// // // //     return this.http.post(`${this.apiUrl}/auth/verify-otp`, { email, otp }, { headers, withCredentials: true });
// // // //   }

// // // //   resendOTP(email: string): Observable<any> {
// // // //     const headers = new HttpHeaders({
// // // //       'Content-Type': 'application/json',
// // // //       'Accept': 'application/json'
// // // //     });

// // // //     return this.http.post(`${this.apiUrl}/auth/resend-otp`, { email }, { headers, withCredentials: true });
// // // //   }

// // // //   setUserData(user: User | null) {
// // // //     this.userSubject.next(user);
// // // //   }

// // // //   getUserData(): User | null {
// // // //     return this.userSubject.value;
// // // //   }

// // // //   logout() {
// // // //     this.userSubject.next(null);
// // // //   }
// // // // }
// // // import { Injectable } from '@angular/core';
// // //      import { HttpClient, HttpHeaders } from '@angular/common/http';
// // //      import { BehaviorSubject, Observable } from 'rxjs';
// // //      import { tap } from 'rxjs/operators';

// // //      export interface User {
// // //        id: string;
// // //        fullName: string;
// // //        email: string;
// // //        telephone: string;
// // //        profilePhoto?: string;
// // //      }

// // //      @Injectable({
// // //        providedIn: 'root'
// // //      })
// // //      export class AuthService {
// // //        private apiUrl = 'https://localhost:44399/api';
// // //        private userSubject = new BehaviorSubject<User | null>(null);
// // //        currentUser$: Observable<User | null> = this.userSubject.asObservable();

// // //        constructor(private http: HttpClient) { }

// // //        register(data: any): Observable<any> {
// // //          const headers = new HttpHeaders({
// // //            'Content-Type': 'application/json',
// // //            'Accept': 'application/json'
// // //          });

// // //          return this.http.post(`${this.apiUrl}/auth/register`, data, { headers, withCredentials: true });
// // //        }

// // //        login(email: string, password: string): Observable<any> {
// // //          const headers = new HttpHeaders({
// // //            'Content-Type': 'application/json',
// // //            'Accept': 'application/json'
// // //          });

// // //          return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, { headers, withCredentials: true })
// // //            .pipe(
// // //              tap((response: any) => {
// // //                if (response && response.user) {
// // //                  this.userSubject.next(response.user);
// // //                }
// // //              })
// // //            );
// // //        }

// // //        verifyEmailOTP(email: string, otp: string): Observable<any> {
// // //          const headers = new HttpHeaders({
// // //            'Content-Type': 'application/json',
// // //            'Accept': 'application/json'
// // //          });

// // //          return this.http.post(`${this.apiUrl}/auth/verify-otp`, { email, otp }, { headers, withCredentials: true });
// // //        }

// // //        resendOTP(email: string): Observable<any> {
// // //          const headers = new HttpHeaders({
// // //            'Content-Type': 'application/json',
// // //            'Accept': 'application/json'
// // //          });

// // //          return this.http.post(`${this.apiUrl}/auth/resend-otp`, { email }, { headers, withCredentials: true });
// // //        }

// // //        setUserData(user: User | null) {
// // //          this.userSubject.next(user);
// // //        }

// // //        getUserData(): User | null {
// // //          return this.userSubject.value;
// // //        }

// // //        logout() {
// // //          this.userSubject.next(null);
// // //        }
// // //      }
// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { BehaviorSubject, Observable } from 'rxjs';
// // import { tap } from 'rxjs/operators';

// // export interface User {
// //   id: string;
// //   fullName: string;
// //   email: string;
// //   telephone: string;
// //   profilePhoto?: string;
// // }

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthService {
// //   private apiUrl = 'https://localhost:44399/api';
// //   private userSubject = new BehaviorSubject<User | null>(null);
// //   currentUser$: Observable<User | null> = this.userSubject.asObservable();

// //   constructor(private http: HttpClient) { }

// //   register(data: any): Observable<any> {
// //     const headers = new HttpHeaders({
// //       'Content-Type': 'application/json',
// //       'Accept': 'application/json'
// //     });

// //     return this.http.post(`${this.apiUrl}/auth/register`, data, { headers, withCredentials: true });
// //   }

// //   login(email: string, password: string): Observable<any> {
// //     const headers = new HttpHeaders({
// //       'Content-Type': 'application/json',
// //       'Accept': 'application/json'
// //     });

// //     return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, { headers, withCredentials: true })
// //       .pipe(
// //         tap((response: any) => {
// //           if (response && response.user) {
// //             this.userSubject.next(response.user);
// //           }
// //         })
// //       );
// //   }

// //   verifyEmailOTP(email: string, otp: string): Observable<any> {
// //     const headers = new HttpHeaders({
// //       'Content-Type': 'application/json',
// //       'Accept': 'application/json'
// //     });

// //     return this.http.post(`${this.apiUrl}/auth/verify-otp`, { email, otp }, { headers, withCredentials: true });
// //   }

// //   resendOTP(email: string): Observable<any> {
// //     const headers = new HttpHeaders({
// //       'Content-Type': 'application/json',
// //       'Accept': 'application/json'
// //     });

// //     return this.http.post(`${this.apiUrl}/auth/resend-otp`, { email }, { headers, withCredentials: true });
// //   }

// //   setUserData(user: User | null) {
// //     this.userSubject.next(user);
// //   }

// //   getUserData(): User | null {
// //     return this.userSubject.value;
// //   }

// //   logout() {
// //     this.userSubject.next(null);
// //   }
// // }

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// export interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   telephone: string;
//   profilePhoto?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'https://localhost:44399/api';
//   private userSubject = new BehaviorSubject<User | null>(null);
//   currentUser$: Observable<User | null> = this.userSubject.asObservable();

//   constructor(private http: HttpClient) { }

//   register(data: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     });

//     return this.http.post(`${this.apiUrl}/auth/register`, data, { headers, withCredentials: true });
//   }

//   login(email: string, password: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     });

//     return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, { headers, withCredentials: true })
//       .pipe(
//         tap((response: any) => {
//           if (response && response.user) {
//             this.userSubject.next(response.user);
//           }
//         })
//       );
//   }

//   verifyEmailOTP(email: string, otp: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     });

//     return this.http.post(`${this.apiUrl}/auth/verify-otp`, { email, otp }, { headers, withCredentials: true });
//   }

//   resendOTP(email: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     });

//     return this.http.post(`${this.apiUrl}/auth/resend-otp`, { email }, { headers, withCredentials: true });
//   }

//   setUserData(user: User | null) {
//     this.userSubject.next(user);
//   }

//   getUserData(): User | null {
//     return this.userSubject.value;
//   }

//   logout() {
//     this.userSubject.next(null);
//   }
// }
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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }, { headers, withCredentials: true })
      .pipe(
        tap((response: any) => {
          if (response && response.user) {
            this.userSubject.next(response.user);
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
  }

  getUserData(): User | null {
    return this.userSubject.value;
  }

  logout() {
    this.userSubject.next(null);
  }
}