import { Component, OnInit } from '@angular/core';
import { TourPackageService, TourPackage, UserPlan, Activity } from '../services/tour-package.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-tour-packages',
  templateUrl: './tour-packages.component.html',
  styleUrls: ['./tour-packages.component.scss']
})
export class TourPackagesComponent implements OnInit {
  tourPackages: TourPackage[] = [];
  userPlans: UserPlan[] = [];
  generatedActivities: Activity[] = [];
  isPlanFormOpen: boolean = false;
  isActivityGeneratorOpen: boolean = false;
  selectedPackage: TourPackage | null = null;
  newPlan: Partial<UserPlan> = {
    planName: '',
    description: '',
    startDate: '',
    endDate: '',
    activities: []
  };
  activityPreferences: string[] = [];
  selectedCategories: string[] = [];
  categories = ['cultural', 'adventure', 'relaxation', 'food', 'shopping'];
  currentUserId: number | null = null;

  constructor(
    private tourPackageService: TourPackageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTourPackages();
    this.loadUserPlans();
    
    // Subscribe to current user changes
    this.authService.currentUser$.subscribe(user => {
      this.currentUserId = user?.id ? Number(user.id) : null;
      if (this.currentUserId) {
        this.loadUserPlans();
      }
    });
  }

  loadTourPackages(): void {
    this.tourPackageService.getTourPackages().subscribe(data => {
      this.tourPackages = data;
    });
  }

  loadUserPlans(): void {
    if (this.currentUserId) {
      this.tourPackageService.getUserPlans(this.currentUserId).subscribe(plans => {
        this.userPlans = plans;
      });
    }
  }

  getPackageName(packageId: number): string {
    const tourPackage = this.tourPackages.find(p => p.packageID === packageId);
    return tourPackage ? tourPackage.packageName : 'Unknown Package';
  }

  openPlanForm(packageId: number): void {
    this.selectedPackage = this.tourPackages.find(p => p.packageID === packageId) || null;
    this.isPlanFormOpen = true;
  }

  openActivityGenerator(): void {
    this.isActivityGeneratorOpen = true;
  }

  generateActivities(): void {
    if (this.selectedCategories.length > 0) {
      this.tourPackageService.generateActivities('Galle', this.selectedCategories)
        .subscribe(activities => {
          this.generatedActivities = activities;
        });
    }
  }

  addPlan(): void {
    if (this.selectedPackage && this.currentUserId) {
      const plan: Omit<UserPlan, 'planId' | 'createdAt'> = {
        packageId: this.selectedPackage.packageID,
        userId: this.currentUserId,
        planName: this.newPlan.planName!,
        description: this.newPlan.description!,
        startDate: this.newPlan.startDate!,
        endDate: this.newPlan.endDate!,
        activities: this.generatedActivities
      };

      this.tourPackageService.addUserPlan(plan).subscribe(newPlan => {
        this.userPlans.push(newPlan);
        this.isPlanFormOpen = false;
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.newPlan = {
      planName: '',
      description: '',
      startDate: '',
      endDate: '',
      activities: []
    };
    this.generatedActivities = [];
    this.selectedCategories = [];
  }

  toggleCategory(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }
}
