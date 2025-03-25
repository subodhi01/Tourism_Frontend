import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DummySessionService {
  private readonly EMAIL_KEY = 'current_email';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  setCurrentEmail(email: string): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Session Email :: ', this.EMAIL_KEY);
      localStorage.setItem(this.EMAIL_KEY, email);
    }
  }

  getCurrentEmail(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.EMAIL_KEY);
    }
    return null; // Default value during SSR
  }

  clearSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.EMAIL_KEY);
    }
  }
}