import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { IProduct, Layout } from '../../interfaces/app.model';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-shop-product',
  imports: [CurrencyPipe, NgClass],
  templateUrl: './shop-product.html',
  styleUrl: './shop-product.scss',
})
export class ShopProduct implements OnChanges {
  layout = input.required<Layout>();
  product = input.required<IProduct>();
  ngOnChanges(changes: SimpleChanges): void {}
}
