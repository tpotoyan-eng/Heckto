// src/app/product/product.component.ts
import { Component, input, signal, inject } from '@angular/core';

import { IProduct } from '../../Models/interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { type ProductActionType } from '../../Models/type';
import { LocalStorageService } from '../services/localstorageService/localStorageService';
import {
  DateFormat,
  NumberFormat,
  ProductAction,
  ProductActionIcons,
  ProductDescription,
} from '../../Models/enum';

@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: 'product.component.html',
  styleUrl: 'product.component.scss',
})
export class Product {
  private navigate = inject(Router);
  private localStorageService = inject(LocalStorageService);

  readonly productType = ProductDescription;
  readonly dateFormat = DateFormat;
  readonly productActions = [
    { type: ProductAction.Basket, iconUrl: ProductActionIcons.BasketIcon },
    { type: ProductAction.Like, iconUrl: ProductActionIcons.LikeIcon },
    { type: ProductAction.Zoom, iconUrl: ProductActionIcons.ZoomIcon },
  ];
  readonly doteColors = ['pink', 'blue', 'navy'];

  product = input.required<IProduct>();
  typeProduct = input<string>('Tech');
  isHovered = signal(false);
  numberFormat = NumberFormat;
  isZoomed = false;
  basket!: IProduct[];

  onHover(state: boolean) {
    this.isHovered.set(state);
  }

  viewDetailes() {
    this.navigate.navigate(['/products', this.product().id.toString()]);
  }

  handleProductAction(actionType: ProductActionType) {
    if (actionType === 'Basket') {
      this.addToBasket(this.product());
      return;
    }

    if (actionType === 'Like') {
      alert('Liked');
      return;
    }

    if (actionType === 'Zoom') {
      this.isZoomed = !this.isZoomed;
    }
  }

  closeZoom() {
    this.isZoomed = false;
  }

  private addToBasket(item: IProduct) {
    this.localStorageService.addToBasket(item);
  }
}
