// src/app/shopProduct/shopProduct.component.ts
import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../models/interface';
import { CurrencyPipe, NgClass } from '@angular/common';
import { LocalStorageService } from '../services/localstorageService/localStorageService';
import { LayoutType } from '../../models/type';

@Component({
  selector: 'app-shop-product',
  imports: [CurrencyPipe, NgClass],
  templateUrl: 'shopProduct.component.html',
  styleUrl: 'shopProduct.component.scss',
})
export class ShopProduct {
  private localStorageService = inject(LocalStorageService);

  layout = input.required<LayoutType>();
  product = input.required<IProduct>();
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
