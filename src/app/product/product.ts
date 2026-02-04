import { Component, input, signal, inject } from '@angular/core';
import { DataBase } from '../services/DataBaseService/data-base';
import { IProduct } from '../../Models/inteface';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { type ProductActionType } from '../../Models/type';
import { LocalStorageService } from '../services/localstorageService/local-storage-service';
import { DateFormat, NumberFormat, ProductAction, ProductActionIcons, ProductDescription } from '../../Models/enum';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  product = input.required<IProduct>();
  isHovered = signal(false);
  typeProduct = input<string>('Tech');
  numberFormat = NumberFormat
  isZoomed = false;
  basket!: IProduct[];

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

  onHover(state: boolean) {
    this.isHovered.set(state);
  }

  viewDetailes() {
    this.navigate.navigate(['/product', this.product().id]);
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
