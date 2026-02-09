// src/app/header/discount.component/discount.component.ts
import { Component, inject, input } from '@angular/core';
import { IDiscountProduct, IProduct } from '../../models/interface';
import { NavigatorService } from '../../services/navigatorService/navigatorService';
import { AppRoutes } from '../../models/enum';
import { LocalStorageService } from '../../services/localstorageService/localStorageService';
import { DataBase } from '../../services/dataBaseService/dataBase';
@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.scss',
})
export class DiscountComponent {
  private localStorageService = inject(LocalStorageService);
  private dbService = inject(DataBase);

  product = input.required<IDiscountProduct>();

  handleShop() {
    const product = this.dbService.getProductById(this.product().id);
    if (!product) return;
    this.localStorageService.addToBasket(product);
  }
}
