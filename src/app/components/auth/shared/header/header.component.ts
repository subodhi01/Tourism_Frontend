import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateToSignIn() {
    this.router.navigate(['/auth/login']);
  }

  navigateToSignUp() {
    this.router.navigate(['/auth/register']);
  }
}
