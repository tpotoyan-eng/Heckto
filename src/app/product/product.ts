import { Component, OnChanges, SimpleChanges, input, signal, inject } from '@angular/core';
import { DataBase } from '../services/DataBaseService/data-base';
import { IProduct } from '../../interfaces/app.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { type ProductActionType } from '../../interfaces/app.model';
import { LocalStorageService } from '../services/localstorageServicee/local-storage-service';

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
  private navigate = inject(Router);
  private localStorageService = inject(LocalStorageService);
  private db = inject(DataBase);

  isZoomed = false;
  basket!: IProduct[];

  constructor() {}

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
      document.body.style.overflow = 'hidden';
    }
  }
  closeZoom() {
    this.isZoomed = false;
    document.body.style.overflow = 'auto';
  }
  private addToBasket(item: IProduct) {
    this.localStorageService.addToBasket(item);
  }
}
