// src/app/footer/footer.component.ts
import { Component, inject } from '@angular/core';
import { NavigatorService } from '../services/navigatorService/navigatorService';
import { Helper } from '../helpers/helperClass';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrl: 'footer.component.scss',
})
export class FooterComponent {
  private navService = inject(NavigatorService);

  readonly socialMedia = Helper.getSocialMedias();
  readonly footerSections = Helper.getFooterSections();

  handleNavigate(path: string) {
    this.navService.handleNavigate(path);
  }
}
