// src/app/pages/homePage/homePage.component.ts
// src/pages/homePage/homePage.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { DataBase } from '../../services/dataBaseService/dataBase';
import { IDiscountProduct, IProduct, IProductAction } from '../../models/interface';
import { ProductComponent } from '../../product/product.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppRoutes, ProductAction, ProductActionIcons } from '../../models/enum';
import { CycleProductComponent } from '../../cycleProduct/cycleProduct.component';
import { Helper } from '../../helpers/helperClass';

@Component({
  selector: 'app-home.component',
  imports: [ProductComponent, RouterLink, CurrencyPipe, CycleProductComponent, CommonModule],
  templateUrl: './homePage.component.html',
  styleUrl: './homePage.component.scss',
  providers: [DataBase],
})
export class HomePageComponent implements OnInit {
  protected db = inject(DataBase);
  protected navService = inject(Router);

  readonly productAction = ProductAction;
  readonly extentionsDiscountItems = Helper.getDiscountExtensionText();
  readonly navItems = Helper.getNavItems();
  readonly discountNavItems = Helper.getDiscountNavItems();
  readonly productActions: IProductAction[] = Helper.getProductActions();

  dotes = [{ active: true }, { active: false }, { active: false }];
  isZoomed = signal(false);
  url = signal('');
  featurdProducts = signal<IProduct[]>([]);
  leastestProducts = signal<IProduct[]>([]);
  discountProducts = signal<IDiscountProduct[]>([]);
  topCategories = signal<IProduct[]>([]);
  activeNavIndex = signal(0);
  activeDiscountNavIndex = signal(0);
  homes = signal<IProduct[]>([]);
  chaire: IProduct = this.db.getProductById(7)!;
  trandProducts: IProduct[] = this.db.getTrendProducts();
  uniqueInfoCons = Helper.getUniqueInfoCons();

  ngOnInit(): void {
    this.featurdProducts.set(this.db.getFeaturedProducts());
    this.leastestProducts.set(this.db.getFirstN(6));
    this.topCategories.set(this.db.getTopCategories());
    const disP = this.db.getDiscountedProducts();
    this.discountProducts.set(disP);
    this.homes.set(this.db.getHomes());
  }

  setActiveNav(index: number) {
    this.activeNavIndex.set(index);
    const shuffled = [...this.db.getFirstN(6)].sort(() => Math.random() - 0.5);
    this.leastestProducts.set([]);
    setTimeout(() => {
      this.leastestProducts.set(shuffled);
    }, 10);
  }

  seeItem(item: IProduct) {
    this.navService.navigate([AppRoutes.Products, item.id]);
  }

  setActiveDiscountNav(index: number) {
    this.activeDiscountNavIndex.set(index);
  }

  doteClick(index: number) {
    const newArr = this.shuffleArray<IProduct>(this.topCategories());
    this.topCategories.set(newArr);
    this.dotes = this.dotes.map((d, i) => ({
      ...d,
      active: i === index,
    }));
  }
  handleAction(type: string, product: IProduct): void {
    if (type === ProductAction.Basket) return this.addToBasket(product);
    if (type === ProductAction.Like) return alert('Liked');
    if (type === ProductAction.Zoom) return this.handleZoom(true, product);
  }

  handleZoom(show: boolean, item: IProduct | null = null) {
    this.isZoomed.set(show);
    if (item) {
      this.url.set(item.url);
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
  }

  private addToBasket(product: IProduct) {
    const emptyBasketJsonStr = '{"basket": []}';
    const storageData = JSON.parse(localStorage.getItem('Heckto') || emptyBasketJsonStr);
    const currentBasket: IProduct[] = storageData.basket;

    const exists = currentBasket.find((item) => item.id === product.id);

    if (!exists) {
      currentBasket.push(product);

      localStorage.setItem('Heckto', JSON.stringify({ ...storageData, basket: currentBasket }));

      alert(`${product.name} added to basket!`);
    } else {
      alert('Product is already in the basket');
    }
    this.navService.navigate(['/basket']);
  }
}
