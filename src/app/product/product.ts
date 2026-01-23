import { Component, input, signal } from '@angular/core';
import { DataBase } from '../services/data-base';
import { IProduct } from '../../interfaces/app.model';
import { CommonModule } from '@angular/common';

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

  constructor(protected db: DataBase) {}

  onHover(state: boolean) {
    this.isHovered.set(state);
  }
}
