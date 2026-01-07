import { Component, input, OnInit } from '@angular/core';
import { discountProduct } from '../../../interfaces/app.model';
@Component({
  selector: 'app-discount',
  imports: [],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent implements OnInit {
  product = input.required<discountProduct>();
  ngOnInit(): void {
    console.log(this.product());
  }
}
