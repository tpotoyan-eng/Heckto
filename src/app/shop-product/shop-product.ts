import { Component, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct, Layout } from '../../interfaces/app.model';
import { CurrencyPipe, NgClass } from '@angular/common';
import { LocalStorageService } from '../services/localstorageServicee/local-storage-service';

@Component({
  selector: 'app-shop-product',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './shop-product.html',
  styleUrl: './shop-product.scss',
})
export class ShopProduct implements OnChanges {
  layout = input.required<Layout>();
  product = input.required<IProduct>();
  private localStorageService = inject(LocalStorageService);
  isZoomed = false;
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.layout());
  }

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
