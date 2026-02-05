// src/pages/homePage/homePage.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { DataBase } from '../../app/services/DataBaseService/dataBase';
import { IDiscountProduct, IProduct } from '../../models/interface';
import { ProductComponent } from '../../app/product/product.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductAction, ProductActionIcons } from '../../models/enum';
import { CycleProductComponent } from '../../app/cycleProduct/cycleProduct.component';

@Component({
  selector: 'app-home.component',
  imports: [ProductComponent, RouterLink, CurrencyPipe, CycleProductComponent, CommonModule],
  templateUrl: './homePage.component.html',
  styleUrl: './homePage.component.scss',
  providers: [DataBase],
})
export class HomePageComponent implements OnInit {
  protected db = inject(DataBase);
  protected navigator = inject(Router);

  readonly productAction = ProductAction;
  readonly extentionsDiscountItems = [
    'Material expose like metals',
    'Clear lines and geomatric figures',
    'Material expose like metals',
    'Simple neutral colours.',
  ];
  readonly navItems = [
    { name: 'New Arrival', link: '/new-arrival' },
    { name: 'Best Seller', link: '/best-seller' },
    { name: 'Featured', link: '/featured' },
    { name: 'Special Offer', link: '/special-offer' },
  ];
  readonly discountNavItems = [
    { name: 'HeadPhones', link: '/', type: 'HeadPhone' },
    { name: 'LapTop ', link: '/', type: 'LapTop' },
    { name: 'Other', link: '/', type: 'Other' },
  ];
  readonly productActions = [
    { type: ProductAction.Basket, iconUrl: ProductActionIcons.BasketIcon },
    { type: ProductAction.Like, iconUrl: ProductActionIcons.LikeIcon },
    { type: ProductAction.Zoom, iconUrl: ProductActionIcons.ZoomIcon },
  ];

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
  uniqueInfoCons: string[] = [
    'All frames constructed with hardwood solids and laminates',
    'Reinforced with double wood dowels, glue, screw - nails corner',
    'Arms, backs and seats are structurally reinforced',
  ];
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
    this.navigator.navigate(['/product', item.id]);
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
    if (type === 'Basket') return this.addToBasket(product);
    if (type === 'Like') return alert('Liked');
    if (type === 'Zoom') return this.handleZoom(true, product);
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
    const storageData = JSON.parse(localStorage.getItem('Heckto') || '{"basket": []}');
    const currentBasket: IProduct[] = storageData.basket;

    const exists = currentBasket.find((item) => item.id === product.id);

    if (!exists) {
      currentBasket.push(product);

      localStorage.setItem('Heckto', JSON.stringify({ ...storageData, basket: currentBasket }));

      alert(`${product.name} added to basket!`);
    } else {
      alert('Product is already in the basket');
    }
    this.navigator.navigate(['/basket']);
  }
}
