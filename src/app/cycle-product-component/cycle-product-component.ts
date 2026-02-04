import { Component, inject, input, signal } from '@angular/core';
import { IProduct } from '../../Models/inteface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cycle-product-component',
  templateUrl: './cycle-product-component.html',
  styleUrl: './cycle-product-component.scss',
})
export class CycleProductComponent {
  hovered = signal(false);
  product = input.required<IProduct>();
  route = inject(Router);

  viewDetails() {
    this.route.navigateByUrl(`/product/${this.product().id}`);
  }
  onHover(state: boolean) {
    this.hovered.set(state);
  }
}
