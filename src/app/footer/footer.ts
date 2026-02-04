import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SocialMedia } from '../../Models/enum';
import { NavigatorService } from '../services/NavigatorService/navigator-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  private navService = inject(NavigatorService);
  readonly socialMedia = this.getSocialMedias();
  readonly footerSections = [
    {
      title: 'Categories',
      links: [
        'Laptops & Computers',
        'Cameras & Photography',
        'Smart Phones & Tablets',
        'Video Games & Consoles',
        'Waterproof Headphones',
      ],
    },
    {
      title: 'Customer Care',
      links: ['My Account', 'Discount', 'Returns', 'Orders History', 'Order Tracking'],
    },
    {
      title: 'Pages',
      links: ['Blog', 'Browse the Shop', 'Category', 'Pre-Built Pages', 'Visual Composer Elements'],
    },
  ];

  handleNavigate(path: string) {
      this.navService.handleNavigate(path);
  }

  private getSocialMedias() {
    const socialMediaValues = Object.values(SocialMedia);
    return socialMediaValues;
  }
}
