// src/app/pages/basketPage/basketPage.component.ts
// src/pages/basketPage/basketPage.component.ts
import { Component, computed, inject } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { LocalStorageService } from '../../services/localstorageService/localStorageService';
import { AppRoutes, NumberFormat } from '../../models/enum';
import { BasketItemComponent } from './basketItem/basketItem.component';
import { NavigatorService } from '../../services/navigatorService/navigatorService';

@Component({
  selector: 'app-basket',
  templateUrl: './basketPage.component.html',
  styleUrl: './basketPage.component.scss',
  imports: [BasketItemComponent, DecimalPipe, NgClass],
})
export class BasketPageComponent {
  private localStorageService = inject(LocalStorageService);
  private navService = inject(NavigatorService);

  readonly SHIPPING_COST = 100;
  readonly items = this.localStorageService.getBasketSignal();
  readonly subtotal = computed(() =>
    this.items().reduce((acc, item) => acc + item.currentPrice * (item.quantity ?? 1), 0),
  );
  readonly totalWithShipping = computed(() => {
    const sub = this.subtotal();
    return sub > 0 ? sub + 100 : 0;
  });
  readonly summaryTable = computed(() => [
    { title: 'Subtotal', className: 'subtotal', value: this.subtotal() },
    { title: 'Total', className: 'total', value: this.totalWithShipping() },
  ]);
  readonly numberFormat = NumberFormat;

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.localStorageService.clearBasket();
    }
  }

  startShopping() {
    this.navService.handleNavigate(AppRoutes.Products);
  }
}
