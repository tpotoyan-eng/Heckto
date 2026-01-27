import { Component, signal, afterNextRender } from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
import { BasketItem } from '../../app/basket-item/basket-item';
@Component({
  selector: 'app-basket',
  standalone: true,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  imports: [BasketItem],
})
export class BasketComponent {
  items = signal<IProduct[]>([]);

  constructor() {
    afterNextRender(() => {
      const rawData = localStorage.getItem('Heckto');
      if (rawData) {
        try {
          const data = JSON.parse(rawData);
          this.items.set(data.basket || []);
          this.items().forEach(console.log);
        } catch (e) {
          console.error('Error parsing storage', e);
        }
      }
    });
  }
}
