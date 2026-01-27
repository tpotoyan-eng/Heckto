import {
  Component,
  signal,
  afterNextRender,
  OnDestroy,
  HostListener,
  computed,
} from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
import { BasketItem } from '../../app/basket-item/basket-item';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  imports: [BasketItem, DecimalPipe],
})
export class BasketComponent implements OnDestroy {
  items = signal<IProduct[]>([]);

  constructor() {
    afterNextRender(() => {
      const rawData = localStorage.getItem('Heckto');
      if (rawData) {
        try {
          const data = JSON.parse(rawData);
          this.items.set(data.basket || []);
        } catch (e) {
          console.error('Error parsing storage', e);
        }
      }
    });
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
  calculateSubtotal = computed(() => {
    return this.items().reduce((acc, item) => {
      return acc + item.currentPrice * (item.quantity || 1);
    }, 0);
  });

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.items.set([]);
    }
  }
}
