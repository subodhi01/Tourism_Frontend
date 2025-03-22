import { Component, OnInit } from '@angular/core';
import { TourPackageService, TourPackage } from '../../services/tour-package.service';
import { CommonModule } from '@angular/common';




@Component({
  standalone: true,
  imports: [CommonModule], 
  selector: 'app-tour-packages',
  templateUrl: './tour-packages.component.html',
  styleUrls: ['./tour-packages.component.scss']
})
export class TourPackagesComponent implements OnInit {
  tourPackages: TourPackage[] = [];

  constructor(private tourPackageService: TourPackageService) {}

  ngOnInit(): void {
    this.tourPackageService.getTourPackages().subscribe(data => {
      this.tourPackages = data;
    });
  }
}
