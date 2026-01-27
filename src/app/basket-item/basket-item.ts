import { Component, input, OnInit, signal, output, effect } from '@angular/core';
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
  quantity = signal(1);

  passToParent = output<IProduct>();
  deleteItem = output<number>();

  ngOnInit(): void {
    const product = this.itemInp();

    this.item.set(product);

    const initialQty = product.quantity ?? 1;
    this.quantity.set(initialQty);
  }

  updateCount(count: number): void {
    const currentProduct = this.item();

    if (currentProduct) {
      this.changeQuantity(currentProduct, count);
    }
  }

  private changeQuantity(currentProduct: IProduct, count: number) {
    const newQuantity = this.quantity() + count;

    if (newQuantity >= 1) {
      this.quantity.set(newQuantity);

      const updatedItem = {
        ...currentProduct,
        quantity: newQuantity,
      };
      this.item.set(updatedItem);

      this.passToParent.emit(updatedItem);
    } else {
      this.deleteItem.emit(currentProduct.id);
    }
  }
}
