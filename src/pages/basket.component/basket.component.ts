import { Component, computed, inject } from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
import { BasketItem } from '../../app/basket-item/basket-item';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../app/services/localstorageServicee/local-storage-service';

@Component({
  selector: 'app-basket',
  standalone: true,
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
  imports: [BasketItem, DecimalPipe],
})
export class BasketComponent {
  private navigator = inject(Router);
  private localStorageService = inject(LocalStorageService);

  items = this.localStorageService.getBasketSignal();
  calculateSubtotal = computed(() =>
    this.items().reduce((acc, item) => acc + item.currentPrice * (item.quantity || 1), 0),
  );

  totalWithShipping = computed(() => {
    const sub = this.calculateSubtotal();
    return sub > 0 ? sub + 100 : 0;
  });

  handleDelete(itemId: number) {
    this.localStorageService.removeFromBasket(itemId);
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.localStorageService.clearBasket();
    }
  }

  reciveFromChild(updatedItem: IProduct) {
    this.localStorageService.updateQuantity(updatedItem);
  }

  startShopping() {
    this.navigator.navigate(['/products']);
  }
}
