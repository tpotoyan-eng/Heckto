// src/app/header/discount.component/discount.component.ts
import { Component, input } from '@angular/core';
import { IDiscountProduct } from '../../../models/interface';
@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent {
  product = input.required<IDiscountProduct>();
}
