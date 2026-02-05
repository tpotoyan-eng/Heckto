// src/app/cycleProduct/cycleProduct.component.ts
import { Component, inject, input, signal } from '@angular/core';
import { IProduct } from '../../models/interface';
import { NavigatorService } from '../services/NavigatorService/navigatorService';

@Component({
  selector: 'app-cycle-product-component',
  templateUrl: 'cycleProduct.component.html',
  styleUrl: 'cycleProduct.component.scss',
})
export class CycleProductComponent {
  private navigator = inject(NavigatorService);

  hovered = signal(false);
  product = input.required<IProduct>();

  viewDetails() {
    const param = this.product().id + '';
    const path = '/product';
    this.navigator.handleNavigate(path, param);
  }

  onHover(state: boolean) {
    this.hovered.set(state);
  }
}
