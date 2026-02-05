// src/pages/errorPage/errorPage.component.ts
// src/pages/error-page-component/errorPage.component.ts
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavigatorService } from '../../app/services/navigatorService/navigatorService';

@Component({
  selector: 'app-error-page',
  standalone: true,
  templateUrl: 'errorPage.component.html',
  styleUrl: 'errorPage.component.scss'
})
export class ErrorPageComponent {
  private navigator = inject(NavigatorService);
  
  errorCode = signal('404');

  goHome() {
   this.navigator.handleNavigate('/home');
  }
}