// src/pages/basketPage/basketPage.component.ts
import { Component, computed, inject } from '@angular/core';
import { DecimalPipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../app/services/localstorageService/localStorageService';
import { NumberFormat } from '../../models/enum';
import { BasketItemComponent } from '../../app/basketItem/basketItem.component';

@Component({
  selector: 'app-basket',
  standalone: true,
  templateUrl: './basketPage.component.html',
  styleUrl: './basketPage.component.scss',
  imports: [BasketItemComponent, DecimalPipe, NgClass],
})
export class BasketPageComponent {
  private localStorageService = inject(LocalStorageService);
  private navigator = inject(Router);

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
    this.navigator.navigate(['/products']);
  }


}
