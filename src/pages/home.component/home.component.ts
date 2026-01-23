import { Component, inject, OnInit, signal } from '@angular/core';
import { DataBase } from '../../app/services/data-base';
import { IProduct } from '../../interfaces/app.model';
import { Product } from '../../app/product/product';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { it } from 'node:test';

@Component({
  selector: 'app-home.component',
  imports: [Product, NgStyle, RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
// export class HomeComponent implements OnInit {
//   protected db = inject(DataBase);

//   featurdProducts = signal<IProduct[]>([]);
//   LeastestProducts: IProduct[] = this.db.getFirstN(6);
//   navItems = [
//     { name: 'New Arrival', link: '/new-arrival' },
//     { name: 'Best Seller', link: '/best-seller' },
//     { name: 'Featured', link: '/featured' },
//     { name: 'Special Offer', link: '/special-offer' },
//   ];

//   activeNavIndex = signal(0);

//   ngOnInit(): void {
//     const products = this.db.getFeaturedProducts();
//     this.featurdProducts.set(products);
//   }

//   setActiveNav(index: number) {
//     this.activeNavIndex.set(index);

//     // 2. Shuffle Logic
//     const shuffled = [...this.db.getFirstN(6)].sort(() => Math.random() - 0.5);

//     // 3. To trigger the CSS animation again, clear then set (or just set)
//     this.leastestProducts.set([]);
//     setTimeout(() => {
//       this.leastestProducts.set(shuffled);
//     }, 10);
//   }
// }
export class HomeComponent implements OnInit {
  protected db = inject(DataBase);
  protected navigator = inject(Router);

  featurdProducts = signal<IProduct[]>([]);
  leastestProducts = signal<IProduct[]>([]);
  activeNavIndex = signal(0);
  chaire: IProduct = this.db.getProductById(7)!;

  navItems = [
    { name: 'New Arrival', link: '/new-arrival' },
    { name: 'Best Seller', link: '/best-seller' },
    { name: 'Featured', link: '/featured' },
    { name: 'Special Offer', link: '/special-offer' },
  ];

  ngOnInit(): void {
    this.featurdProducts.set(this.db.getFeaturedProducts());

    this.leastestProducts.set(this.db.getFirstN(6));
    console.log(this.leastestProducts());
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
}
