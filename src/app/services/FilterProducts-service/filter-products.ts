import { inject, Injectable, OnInit } from '@angular/core';
import {
  Brend,
  Catgeroies,
  DiscountProcent,
  filterSettings,
  IProduct,
  Rating,
  Price,
} from '../../../interfaces/app.model';
import { DataBase } from '../DataBaseService/data-base';

@Injectable({
  providedIn: 'root',
})
export class FilterProducts {
  private products!: IProduct[];
  private db = inject(DataBase);

  constructor() {
    this.products = this.db.getProducts();
  }

  filterProducts(filterObj: filterSettings): IProduct[] {
    return this.products.filter(
      (p) =>
        this.matchesBrand(p, filterObj.ProductBrand) &&
        this.matchesDiscount(p, filterObj.DiscountOffer) &&
        this.matchesRating(p, filterObj.Rating) &&
        this.matchesCategory(p, filterObj.Categories) &&
        this.matchesPrice(p, filterObj.Price),
    );
  }

  private matchesBrand(product: IProduct, brands: Brend[]): boolean {
    if (!brands.length) return true;
    return brands.includes(product.brand!);
  }

  private matchesDiscount(product: IProduct, discounts: DiscountProcent[]): boolean {
    if (!discounts.length) return true;
    return discounts.includes(product.discountOffer!);
  }

  private matchesRating(product: IProduct, ratings: Rating[]): boolean {
    if (!ratings.length) return true;
    return ratings.includes(product.rating as Rating);
  }

  private matchesCategory(product: IProduct, categories: Catgeroies[]): boolean {
    console.log(categories);
    if (!categories.length) return true;
    return categories.includes(product.category!);
  }

  private matchesPrice(product: IProduct, prices: Price[]): boolean {
    if (!prices.length) return true;
    return prices.some(
      ([min, max]) => product.currentPrice >= min && (max === null || product.currentPrice <= max),
    );
  }
}
