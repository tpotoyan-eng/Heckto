import { Injectable, afterNextRender, signal, inject } from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
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

  getBasketItems(): IProduct[] {
    return this.basket();
  }

  addToBasket(product: IProduct) {
    const storageData = JSON.parse(localStorage.getItem('Heckto') || '{"basket": []}');
    const currentBasket: IProduct[] = storageData.basket;
    const exists = currentBasket.find((item) => item.id === product.id);

    if (!exists) {
      currentBasket.push(product);
      this.basket.set(currentBasket);
      alert(`Item ${product.name} added to basket`);
    } else {
      alert('Product is already in the basket');
    }
    this.navigate.navigate(['/basket']);
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
    console.log(this.basket);
  }
}
