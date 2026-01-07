import { Injectable } from '@angular/core';
import { discountProduct } from '../../interfaces/app.model';
import { DISCOUNT_PRODUCTS } from '../../DB/indexDb';

@Injectable({
  providedIn: 'root',
})
export class DataBase {
  private discountedProducts: discountProduct[] = DISCOUNT_PRODUCTS;
  getDiscountedProducts(): discountProduct[] {
    return this.discountedProducts;
  }
}
