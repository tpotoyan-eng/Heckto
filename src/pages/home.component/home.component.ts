import { Component, inject, OnInit, signal } from '@angular/core';
import { DataBase } from '../../app/services/DataBaseService/data-base';
import { discountProduct, IProduct } from '../../interfaces/app.model';
import { Product } from '../../app/product/product';
import { CommonModule, CurrencyPipe, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CycleProductComponent } from '../../app/cycle-product-component/cycle-product-component';
import { sign } from 'crypto';

@Component({
  selector: 'app-home.component',
  imports: [Product, RouterLink, CurrencyPipe, CycleProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  protected db = inject(DataBase);
  protected navigator = inject(Router);

  isZoomed = signal(false);
  url = signal('');

  featurdProducts = signal<IProduct[]>([]);
  leastestProducts = signal<IProduct[]>([]);
  discountProducts = signal<discountProduct[]>([]);
  topCategories = signal<IProduct[]>([]);
  activeNavIndex = signal(0);
  activeDiscountNavIndex = signal(0);
  homes = signal<IProduct[]>([]);
  chaire: IProduct = this.db.getProductById(7)!;
  trandProducts: IProduct[] = this.db.getTrendProducts();

  navItems = [
    { name: 'New Arrival', link: '/new-arrival' },
    { name: 'Best Seller', link: '/best-seller' },
    { name: 'Featured', link: '/featured' },
    { name: 'Special Offer', link: '/special-offer' },
  ];
  discountNavItems = [
    { name: 'HeadPhones', link: '/', type: 'HeadPhone' },
    { name: 'LapTop ', link: '/', type: 'LapTop' },
    { name: 'Other', link: '/', type: 'Other' },
  ];
  dotes = [{ active: true }, { active: false }, { active: false }];
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
  private shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
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
