import { Component, inject, OnInit, signal } from '@angular/core';
import { DataBase } from '../../app/services/data-base';
import { discountProduct, IProduct } from '../../interfaces/app.model';
import { Product } from '../../app/product/product';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { it } from 'node:test';
import { link } from 'fs';
import { sign } from 'crypto';
import { IpcNetConnectOpts } from 'net';

@Component({
  selector: 'app-home.component',
  imports: [Product, NgStyle, RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  protected db = inject(DataBase);
  protected navigator = inject(Router);

  featurdProducts = signal<IProduct[]>([]);
  leastestProducts = signal<IProduct[]>([]);
  discountProducts = signal<discountProduct[]>([]);

  activeNavIndex = signal(0);
  activeDiscountNavIndex = signal(0);

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

  ngOnInit(): void {
    this.featurdProducts.set(this.db.getFeaturedProducts());

    this.leastestProducts.set(this.db.getFirstN(6));

    const disP = this.db.getDiscountedProducts();
    this.discountProducts.set(disP);
  }

  setActiveNav(index: number) {
    this.activeNavIndex.set(index);

    const shuffled = [...this.db.getFirstN(6)].sort(() => Math.random() - 0.5);

    this.leastestProducts.set([]);
    setTimeout(() => {
      this.leastestProducts.set(shuffled);
    }, 10);

    console.log('shuffeled');
  }
  seeItem(item: IProduct) {
    this.navigator.navigate(['/product', item.id]);
  }
  setActiveDiscountNav(index: number) {
    this.activeDiscountNavIndex.set(index);
  }
}
