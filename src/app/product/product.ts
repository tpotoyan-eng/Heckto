import { Component, OnChanges, SimpleChanges, input, signal, inject } from '@angular/core';
import { DataBase } from '../services/data-base';
import { IProduct } from '../../interfaces/app.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { type ProductActionType } from '../../interfaces/app.model';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product implements OnChanges {
  product = input.required<IProduct>();
  isHovered = signal(false);
  navigate = inject(Router);
  typeProduct = input<string>('Tech');
  isZoomed = false;
  basket!: IProduct[];

  constructor(protected db: DataBase) {
    const data = localStorage.getItem('Heckto');
    this.basket = data ? JSON.parse(data).basket : [];
    console.log(this.basket);
  }

  onHover(state: boolean) {
    this.isHovered.set(state);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.typeProduct());
  }

  viewDetailes() {
    this.navigate.navigate(['/product', this.product().id]);
  }

  handleProductAction(actionType: ProductActionType) {
    if (actionType === 'Basket') {
      this.addToBasket();
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
  private addToBasket() {
    const storageData = JSON.parse(localStorage.getItem('Heckto') || '{"basket": []}');
    const currentBasket: IProduct[] = storageData.basket;

    const exists = currentBasket.find((item) => item.id === this.product().id);

    if (!exists) {
      currentBasket.push(this.product());

      localStorage.setItem('Heckto', JSON.stringify({ ...storageData, basket: currentBasket }));

      this.basket = currentBasket;

      alert(`${this.product().name} added to basket!`);
    } else {
      alert('Product is already in the basket');
    }
    this.navigate.navigate(['/basket']);
  }
}
