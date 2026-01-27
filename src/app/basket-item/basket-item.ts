import { Component, input, OnInit, signal } from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket-item.html',
  styleUrl: './basket-item.scss',
})
export class BasketItem implements OnInit {
  itemInp = input.required<IProduct>();
  item = signal<IProduct | null>(null);

  quantity = signal(0);

  ngOnInit(): void {
    this.item.set(this.itemInp());
    this.quantity.set(this.item()?.quantity ?? 1);
  }

  updateCount(count: number) {
    const currentItem = this.item();

    if (currentItem && currentItem.quantity !== undefined) {
      const newQuantity = currentItem.quantity + count;

      if (newQuantity >= 1) {
        this.item.set({
          ...currentItem,
          quantity: newQuantity,
        });

        this.quantity.set(newQuantity);
      }
    }
  }
}
