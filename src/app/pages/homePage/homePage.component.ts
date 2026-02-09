// src/app/pages/homePage/homePage.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { DataBase } from '../../services/dataBaseService/dataBase';
import { IDiscountProduct, IProduct, IProductAction } from '../../models/interface';
import { ProductComponent } from '../../product/product.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AppRoutes, ProductAction, ProductActionIcons } from '../../models/enum';
import { CycleProductComponent } from '../../cycleProduct/cycleProduct.component';
import { Helper } from '../../helpers/helperClass';
import { LocalStorageService } from '../../services/localstorageService/localStorageService';

@Component({
  selector: 'app-home.component',
  imports: [ProductComponent, RouterLink, CurrencyPipe, CycleProductComponent, CommonModule],
  templateUrl: './homePage.component.html',
  styleUrl: './homePage.component.scss',
  providers: [DataBase],
})
export class HomePageComponent implements OnInit {
  protected dbService = inject(DataBase);
  protected navService = inject(Router);
  protected localStorageService = inject(LocalStorageService);

  readonly productAction = ProductAction;
  readonly extentionsDiscountItems = Helper.getDiscountExtensionText();
  readonly navItems = Helper.getNavItems();
  readonly discountNavItems = Helper.getDiscountNavItems();
  readonly productActions: IProductAction[] = Helper.getProductActions();
  arraySize4 = signal([{ active: true }, { active: false }, { active: false }, { active: false }]);

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
  chaire: IProduct = this.dbService.getProductById(7)!;
  trandProducts: IProduct[] = this.dbService.getTrendProducts();
  uniqueInfoCons = Helper.getUniqueInfoCons();

  ngOnInit(): void {
    this.featurdProducts.set(this.dbService.getFeaturedProducts());
    this.leastestProducts.set(this.dbService.getFirstN(6));
    this.topCategories.set(this.dbService.getTopCategories());
    const disP = this.dbService.getDiscountedProducts();
    this.discountProducts.set(disP);
    this.homes.set(this.dbService.getHomes());
    console.log(this.arraySize4);
  }

  setActiveNav(index: number) {
    this.activeNavIndex.set(index);
    const shuffled = [...this.dbService.getFirstN(6)].sort(() => Math.random() - 0.5);
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

  doteClick(index: number, forDot: boolean = false) {
    if (forDot) {
      const newArr = Helper.shuffleArray(this.featurdProducts());
      this.featurdProducts.set(newArr);
      this.arraySize4.set(
        this.arraySize4().map((d, i) => ({
          ...d,
          active: i === index,
        })),
      );

      return;
    }

    const newArr = Helper.shuffleArray<IProduct>(this.topCategories());
    this.topCategories.set(newArr);
    this.dotes = this.dotes.map((d, i) => ({
      ...d,
      active: i === index,
    }));
  }

  handleAction(type: string, product: IProduct): void {
    if (type === ProductAction.Basket) return this.localStorageService.addToBasket(product);
    if (type === ProductAction.Like) return alert('Liked');
    if (type === ProductAction.Zoom) return this.handleZoom(true, product);
  }

  handleZoom(show: boolean, item: IProduct | null = null) {
    this.isZoomed.set(show);
    if (item) {
      this.url.set(item.url);
    }
  }
}
