import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigatorService {
  private navigator = inject(Router);

  handleNavigate(linkName: string, params?: string) {
    const path = linkName
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    const navigationArray = params ? [`/${path}`, params] : [`/${path}`];

    this.navigator.navigate(navigationArray);
  }
}
