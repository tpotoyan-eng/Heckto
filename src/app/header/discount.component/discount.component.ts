import { Component, input } from '@angular/core';
import { IDiscountProduct } from '../../../Models/inteface';
@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent {
  product = input.required<IDiscountProduct>();
}
