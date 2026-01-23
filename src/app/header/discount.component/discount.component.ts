import { Component, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { discountProduct } from '../../../interfaces/app.model';
@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent implements OnChanges {
  product = input.required<discountProduct>();
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.product());
  }
}
