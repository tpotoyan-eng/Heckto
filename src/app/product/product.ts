import { Component, inject, input, signal } from '@angular/core';
import { DataBase } from '../services/data-base';
import { IProduct } from '../../interfaces/app.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductType } from '../../interfaces/app.model';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class Product {
  product = input.required<IProduct>();
  isHovered = signal(false);
  navigate = inject(Router);
  typeProduct = input<ProductType>();
  constructor(protected db: DataBase) {}

  onHover(state: boolean) {
    this.isHovered.set(state);
  }

  viewDetailes() {
    this.navigate.navigate(['/product', this.product().id]);
  }
}
