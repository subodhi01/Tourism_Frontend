import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  isDropdownOpen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    console.log('HeaderComponent constructed');
  }

  ngOnInit() {
    console.log('HeaderComponent initialized');
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.isLoggedIn = !!user;
      this.currentUser = user;
      if (user) {
        console.log('User state changed in header:', user);
        console.log('Header state updated:', { isLoggedIn: this.isLoggedIn, currentUser: this.currentUser });
      }
    });
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-profile')) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  navigateToSignIn() {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/auth/register']);
  }

  navigateToPlaces() {
    this.router.navigate(['/auth/places']);
  }

  navigateToTourPackages() {
    this.router.navigate(['/tour-packages']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  logout() {
    console.log('Logging out from header');
    this.authService.logout();
    this.router.navigate(['/auth/login']);
    this.isDropdownOpen = false;
  }
}