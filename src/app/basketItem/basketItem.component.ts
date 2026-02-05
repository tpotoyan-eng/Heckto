// src/app/basketItem/basketItem.component.ts
import { Component, input, inject, computed } from '@angular/core';
import { IProduct } from '../../Models/interface';
import { CommonModule } from '@angular/common';
import { NumberFormat, QuantityAction } from '../../Models/enum';
import { LocalStorageService } from '../services/localstorageService/localStorageService';

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'basketItem.component.html',
  styleUrl: 'basketItem.component.scss',
})
export class BasketItem {

  private localStorageService = inject(LocalStorageService);


  itemInp = input.required<IProduct>();
  quantity = computed(() => this.itemInp().quantity ?? 1);
  numberFormat = NumberFormat;
  quantityAction = QuantityAction;

  updateCount(newQuantity: number): void {
    this.localStorageService.updateQuantity(this.itemInp().id, newQuantity);
  }
}
