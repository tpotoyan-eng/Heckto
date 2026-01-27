import { Component, OnChanges, SimpleChanges, input, signal, inject } from '@angular/core';
import { DataBase } from '../services/data-base';
import { IProduct } from '../../interfaces/app.model';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
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
  constructor(protected db: DataBase) {}

  onHover(state: boolean) {
    this.isHovered.set(state);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.typeProduct());
  }

  viewDetailes() {
    this.navigate.navigate(['/product', this.product().id]);
  }
}
