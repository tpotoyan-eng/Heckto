// src/app/pages/errorPage/errorPage.component.ts
// src/pages/errorPage/errorPage.component.ts
// src/pages/error-page-component/errorPage.component.ts
import { Component, inject, signal } from '@angular/core';
import { NavigatorService } from '../../services/navigatorService/navigatorService';
import { AppRoutes } from '../../models/enum';

@Component({
  selector: 'app-error-page',
  templateUrl: 'errorPage.component.html',
  styleUrl: 'errorPage.component.scss',
})
export class ErrorPageComponent {
  private navService = inject(NavigatorService);
  readonly PAGE_NOT_FOUND_CODE = '404';
  errorCode = signal(this.PAGE_NOT_FOUND_CODE);

  goHome() {
    this.navService.handleNavigate(AppRoutes.Home);
  }
}
