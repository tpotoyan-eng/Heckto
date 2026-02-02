import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
import { DataBase } from '../../app/services/DataBaseService/data-base';
import { CommonModule } from '@angular/common';
import { ShopProduct } from '../../app/shop-product/shop-product';
import {
  Brend,
  DiscountProcent,
  Rating,
  Catgeroies,
  Price,
  filterSettings,
} from '../../interfaces/app.model';
import { FilterProducts } from '../../app/services/FilterProducts-service/filter-products';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ShopProduct],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit {
  private filterService = inject(FilterProducts);
  private db = inject(DataBase);
  readonly brands = ['Casio', 'Apple', 'Sony', 'Nike'];
  readonly categories = ['Watches', 'Headphones', 'Laptop', 'Game Console'];
  filteredProducts = signal<IProduct[]>([]);

  readonly ratings = [
    [true, false, false, false, false],
    [true, true, false, false, false],
    [true, true, true, false, false],
    [true, true, true, true, false],
    [true, true, true, true, true],
  ];
  perPageArr: number[] = [];
  productes = signal<IProduct[]>([]);
  viewMode = signal<'grid' | 'list'>('grid');
  sortBy = signal<string>('high-low');
  pageNum = signal(1);
  perPage = signal(10);

  selectedBrands: Set<Brend> = new Set<Brend>();
  selectedDiscounts: Set<DiscountProcent> = new Set<DiscountProcent>();
  selectedRatings: Set<Rating> = new Set<Rating>();
  selectedCategories: Set<Catgeroies> = new Set<Catgeroies>();
  selectedPrices: Set<Price> = new Set<Price>();

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleSelection<T>(value: T, type: string) {
    console.log(value, type);
    switch (type) {
      case 'brend':
        if (this.selectedBrands.has(value as Brend)) {
          this.selectedBrands.delete(value as Brend);
        } else {
          this.selectedBrands.add(value as Brend);
        }
        break;

      case 'discount':
        if (this.selectedDiscounts.has(value as DiscountProcent)) {
          this.selectedDiscounts.delete(value as DiscountProcent);
        } else {
          this.selectedDiscounts.add(value as DiscountProcent);
        }
        break;

      case 'rating':
        if (this.selectedRatings.has(value as Rating)) {
          this.selectedRatings.delete(value as Rating);
        } else {
          this.selectedRatings.add(value as Rating);
        }
        break;
      case 'category':
        if (this.selectedCategories.has(value as Catgeroies)) {
          this.selectedCategories.delete(value as Catgeroies);
        } else {
          this.selectedCategories.add(value as Catgeroies);
        }
        break;
    }
    console.log(this.selectedCategories);
    this.applyFilters();
  }

  applyFilters() {
    const filterObj: filterSettings = {
      ProductBrand: [...this.selectedBrands],
      DiscountOffer: [...this.selectedDiscounts],
      Rating: [...this.selectedRatings],
      Categories: [...this.selectedCategories],
      Price: [...this.selectedPrices],
    };

    const filtered = this.filterService.filterProducts(filterObj);
    this.filteredProducts.set(filtered);

    this.pageNum.set(1);
    this.updateProductsForPage();
  }

  goToPage(to: number) {
    const pageCount = this.perPageArr.length;
    if (to > pageCount) this.pageNum.set(1);
    else if (to <= 0) this.pageNum.set(pageCount);
    else this.pageNum.set(to);

    this.updateProductsForPage();
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
    this.pageNum.set(1);
    this.updateProductsForPage();
  }

  private loadProducts(): void {
    const allProducts = this.db.getProducts();
    this.filteredProducts.set(allProducts);
    this.updateProductsForPage();
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

  private updateProductsForPage() {
    const start = (this.pageNum() - 1) * this.perPage();
    const end = start + this.perPage();

    const pageProducts = this.filteredProducts().slice(start, end);
    this.productes.set(pageProducts);

    const totalPages = Math.ceil(this.filteredProducts().length / this.perPage());
    this.perPageArr = [];
    for (let i = 1; i <= totalPages; i++) {
      this.perPageArr.push(i);
    }

    this.applySort();
  }
}
