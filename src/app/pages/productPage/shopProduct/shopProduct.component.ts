// src/app/pages/productPage/shopProduct/shopProduct.component.ts
// src/app/shopProduct/shopProduct.component.ts
import { Component, HostListener, inject, input } from '@angular/core';
import { IProduct } from '../../../models/interface';
import { CurrencyPipe, NgClass } from '@angular/common';
import { LocalStorageService } from '../../../services/localstorageService/localStorageService';
import { LayoutType } from '../../../models/type';
import { AppRoutes, ProductAction } from '../../../models/enum';
import { NavigatorService } from '../../../services/navigatorService/navigatorService';

@Component({
  selector: 'app-shop-product',
  imports: [CurrencyPipe, NgClass],
  templateUrl: 'shopProduct.component.html',
  styleUrl: 'shopProduct.component.scss',
})
export class ShopProduct {
  private localStorageService = inject(LocalStorageService);
  private navService = inject(NavigatorService);

  readonly ratingsArr = new Array(5).fill(0).map((_, i) => i + 1);
  readonly productActions = ProductAction;

  layout = input.required<LayoutType>();
  product = input.required<IProduct>();
  isZoomed = false;

 
  viewDetails(){
      this.navService.handleNavigate(AppRoutes.Products , this.product().id.toString());
  }

  handleAction(actionType: string) {
    if (actionType === ProductAction.Basket) {
      this.localStorageService.addToBasket(this.product());
    }

    if (actionType === ProductAction.Zoom) {
      this.toggleZoom(true);
    }
  }

  toggleZoom(event: boolean) {
    this.isZoomed = event;
  }

}
