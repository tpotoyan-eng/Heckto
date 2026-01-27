import { Injectable } from '@angular/core';
import { discountProduct } from '../../interfaces/app.model';
import { DISCOUNT_PRODUCTS, HOMES, PRODUCTS, TOP_CATEGORIES } from '../../DB/indexDb';
import { IProduct } from '../../interfaces/app.model';

@Injectable({
  providedIn: 'root',
})
export class DataBase {
  private discountedProducts: discountProduct[] = DISCOUNT_PRODUCTS;
  private products: IProduct[] = PRODUCTS;
  private topCategories: IProduct[] = TOP_CATEGORIES;
  private homes: IProduct[] = HOMES;
  getTopCategories(): IProduct[] {
    return this.topCategories;
  }
  getDiscountedProducts(): discountProduct[] {
    return this.discountedProducts;
  }

  getProducts(): IProduct[] {
    return this.products;
  }
  getFirstN(N: number) {
    return this.products.slice(0, N);
  }

  getFeaturedProducts() {
    const firstFoure = 4;
    const featuredPr = this.products.filter((pr) => pr.type === 'Tech').slice(0, firstFoure);

    return featuredPr;
  }

  getProductById(id: number): undefined | IProduct {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    }
    return undefined;
  }

  getTrendProducts(): IProduct[] {
    return this.products.filter((pr) => pr.type === 'Trend');
  }

  getHomes() {
    return this.homes;
  }
}
