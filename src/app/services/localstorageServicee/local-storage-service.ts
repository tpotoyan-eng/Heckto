import { Injectable, afterNextRender, signal, inject, OnDestroy } from '@angular/core';
import { IProduct } from '../../../interfaces/app.model';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private basket = signal<IProduct[]>([]);
  private navigate = inject(Router);

  constructor() {
    afterNextRender(() => {
      this.loadBasketFromStorage();
    });
  }
  getBasketSignal() {
    return this.basket.asReadonly();
  }

  clearBasket() {
    this.basket.set([]);
    this.syncToStorage([]);
  }

  removeFromBasket(productId: number) {
    this.basket.update((items) => {
      const newItems = items.filter((i) => i.id !== productId);
      this.syncToStorage(newItems);
      return newItems;
    });
  }

  updateQuantity(updatedItem: IProduct) {
    this.basket.update((items) => {
      const newItems = items.map((item) => (item.id === updatedItem.id ? updatedItem : item));
      this.syncToStorage(newItems);
      return newItems;
    });
  }

  getBasketItems(): IProduct[] {
    return this.basket();
  }

  addToBasket(product: IProduct) {
    const currentBasket = this.basket();
    const exists = currentBasket.find((item) => item.id === product.id);

    if (!exists) {
      this.basket.update((items) => {
        const newItems = [...items, product];
        this.syncToStorage(newItems);
        return newItems;
      });

      alert(`Item ${product.name} added to basket`);
    } else {
      alert('Product is already in the basket');
    }

    this.navigate.navigate(['/basket']);
  }

  private syncToStorage(items: IProduct[]) {
    localStorage.setItem('Heckto', JSON.stringify({ basket: items }));
  }

  private loadBasketFromStorage() {
    const rawData = localStorage.getItem('Heckto');
    if (rawData) {
      try {
        const data = JSON.parse(rawData);

        this.basket.set(data.basket || []);
      } catch (e) {
        console.error('Error parsing storage', e);
      }
    }
  }
}
