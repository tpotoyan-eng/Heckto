import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { discountProduct } from '../../../interfaces/app.model';
@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent {
  product = input.required<discountProduct>();
}
