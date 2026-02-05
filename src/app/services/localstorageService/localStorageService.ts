// src/app/services/localstorageService/localStorageService.ts
import { Injectable, afterNextRender, signal, inject } from '@angular/core';
import { IProduct } from '../../../Models/interface';
import { Router } from '@angular/router';

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

  updateQuantity(productId: number, count: number): boolean {
    let success = false;

    this.basket.update((items) => {
      const product = items.find((p) => p.id === productId);

      if (!product) {
        success = false;
        return items;
      }

      const newQuantity = (product.quantity ?? 1) + count;
      console.log(newQuantity);
      let newItems: IProduct[];

      if (newQuantity <= 0) {
        newItems = items.filter((p) => p.id !== productId);
      } else {
        newItems = items.map((p) => (p.id === productId ? { ...p, quantity: newQuantity } : p));
      }

      this.syncToStorage(newItems);
      success = true;
      console.log(newItems);
      return newItems;
    });

    return success;
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
