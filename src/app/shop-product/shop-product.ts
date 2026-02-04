import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../Models/inteface';
import { CurrencyPipe, NgClass } from '@angular/common';
import { LocalStorageService } from '../services/localstorageService/local-storage-service';
import { LayoutType } from '../../Models/type';

@Component({
  selector: 'app-shop-product',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './shop-product.html',
  styleUrl: './shop-product.scss',
})
export class ShopProduct {
  layout = input.required<LayoutType>();
  product = input.required<IProduct>();
  private localStorageService = inject(LocalStorageService);
  isZoomed = false;

  handleAction(actionType: string) {
    actionType = actionType.toLowerCase();
    if (actionType === 'basket') {
      this.localStorageService.addToBasket(this.product());
    }

    if (actionType === 'zoom') {
      this.handleZoom();
    }
  }

  private handleZoom() {
    this.isZoomed = true;
  }

  closeZoom() {
    this.isZoomed = false;
  }
}
