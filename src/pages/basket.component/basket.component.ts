import {
  Component,
  signal,
  afterNextRender,
  OnDestroy,
  HostListener,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
import { BasketItem } from '../../app/basket-item/basket-item';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  standalone: true,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  imports: [BasketItem, DecimalPipe],
})
export class BasketComponent implements OnDestroy {
  items = signal<IProduct[]>([]);
  private navigator = inject(Router);
  private isBrowser!: boolean;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      this.loadBasketFromStorage();
    });
  }
  private loadBasketFromStorage() {
    const rawData = localStorage.getItem('Heckto');
    if (rawData) {
      try {
        const data = JSON.parse(rawData);
        this.items.set(data.basket || []);
      } catch (e) {
        console.error('Error parsing storage', e);
      }
    }
  }

  @HostListener('window:beforeunload')
  saveOnBrowserExit() {
    this.persistData();
  }

  ngOnDestroy(): void {
    this.persistData();
  }

  reciveFromChild(updatedItem: IProduct) {
    this.items.update((currentItems) =>
      currentItems.map((item) => (item.id === updatedItem.id ? { ...updatedItem } : item)),
    );
  }

  private persistData() {
    const basket = this.items();
    if (basket.length >= 0) {
      localStorage.setItem('Heckto', JSON.stringify({ basket }));
    }
  }
  calculateSubtotal = computed(() =>
    this.items().reduce((acc, item) => acc + item.currentPrice * (item.quantity || 1), 0),
  );
  totalWithShipping = computed(() => {
    const sub = this.calculateSubtotal();
    return sub > 0 ? sub + 100 : 0;
  });
  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.items.set([]);
    }
  }
  handleDelete(itemId: number) {
    this.items.update((prev) => prev.filter((item) => item.id !== itemId));
  }
  startShopping() {
    console.log('aaa');
    this.navigator.navigate(['/products']);
  }
}
