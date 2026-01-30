import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
import { DataBase } from '../../app/services/DataBaseService/data-base';
import { CommonModule } from '@angular/common';
import { Product } from '../../app/product/product';
import { ShopProduct } from '../../app/shop-product/shop-product';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ShopProduct],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit {
  private db = inject(DataBase);
  perPageArr: number[] = [];
  productes = signal<IProduct[]>([]);
  viewMode = signal<'grid' | 'list'>('list');
  sortBy = signal<string>('high-low');
  pageNum = signal(1);
  perPage = signal(10);

  readonly brands = ['Casio', 'Apple', 'Sony', 'Nike'];
  readonly categories = ['Watches', 'Headphones', 'Laptop', 'Game Console'];

  ngOnInit(): void {
    this.loadProducts();
  }

  goToPage(to: number) {
    const pageCount = this.perPageArr.length;
    if (to > pageCount) {
      this.pageNum.set(1);
    } else if (to <= 0) {
      this.pageNum.set(this.perPageArr.at(-1) ?? 1);
    } else {
      this.pageNum.set(to);
    }
    console.log(this.pageNum());
    this.loadProducts();
  }

  loadProducts(): void {
    this.perPageArr = [];
    const [products, pageCount] = this.db.getProductsInRange(this.pageNum(), this.perPage());
    this.productes.set(products);
    this.applySort();

    for (let i = 1; i <= pageCount; ++i) {
      this.perPageArr.push(i);
    }
  }

  toggleView(mode: 'grid' | 'list'): void {
    this.viewMode.set(mode);
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.sortBy.set(value);
    this.applySort();
  }

  onPerPageChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.perPage.set(value);

    this.loadProducts();
  }

  private applySort(): void {
    const current = [...this.productes()];
    if (this.sortBy() === 'high-low') {
      current.sort((a, b) => b.currentPrice - a.currentPrice);
    } else if (this.sortBy() === 'low-high') {
      current.sort((a, b) => a.currentPrice - b.currentPrice);
    }
    this.productes.set(current);
  }
}
