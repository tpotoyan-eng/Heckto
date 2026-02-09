// src/app/pages/productPage/productPage.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProduct, IFilterSettings } from '../../models/interface';
import { DataBase } from '../../services/dataBaseService/dataBase';
import { CommonModule } from '@angular/common';
import { ShopProduct } from './shopProduct/shopProduct.component';
import {
  BrendType,
  DiscountProcentType,
  RatingType,
  CatgeroiesType,
  PriceType,
  LayoutType,
} from '../../models/type';

import { FilterProducts } from '../../services/filterProductsService/filterProducts';
import { FilterBy, ProductLayout, SortBy, ViewMode } from '../../models/enum';
import { Helper } from '../../helpers/helperClass';

@Component({
  selector: 'app-product-page',
  imports: [CommonModule, ShopProduct],
  templateUrl: './productPage.component.html',
  styleUrl: './productPage.component.scss',
  providers: [DataBase],
})
export class ProductPageComponent implements OnInit {
  private filterService = inject(FilterProducts);
  private dbService = inject(DataBase);

  readonly filterBy = FilterBy;
  readonly brandOptions = Helper.getBrandOptions();
  readonly brands = Helper.getBrendNames();
  readonly discountOffer = Helper.getDiscountOffer();
  readonly categories = Helper.getCategories();
  readonly ratings = Helper.getRatings();
  readonly priceRanges = Helper.getPriceRanges();
  readonly filterGroups = Helper.getFilterGroups();
  readonly viewModes = ViewMode;
  readonly layoutType = ProductLayout;

  perPageArr: number[] = [];
  productes = signal<IProduct[]>([]);
  viewMode = signal<'grid' | 'list'>(ProductLayout.list);
  sortBy = signal<string>(SortBy.HighToLow);
  pageNum = signal(1);
  perPage = signal(10);
  selectedBrands: Set<BrendType> = new Set<BrendType>();
  selectedDiscounts: Set<DiscountProcentType> = new Set<DiscountProcentType>();
  selectedRatings: Set<RatingType> = new Set<RatingType>();
  selectedCategories: Set<CatgeroiesType> = new Set<CatgeroiesType>();
  selectedPrices: Set<PriceType> = new Set<PriceType>();
  filteredProducts = signal<IProduct[]>([]);

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleSelection<T>(value: T, type: string) {
    console.log(value, type);
    switch (type) {
      case FilterBy.ProductBrand:
        if (this.selectedBrands.has(value as BrendType)) {
          this.selectedBrands.delete(value as BrendType);
        } else {
          this.selectedBrands.add(value as BrendType);
        }
        break;

      case FilterBy.DiscountOffer:
        if (this.selectedDiscounts.has(value as DiscountProcentType)) {
          this.selectedDiscounts.delete(value as DiscountProcentType);
        } else {
          this.selectedDiscounts.add(value as DiscountProcentType);
        }
        break;

      case FilterBy.Rating:
        if (this.selectedRatings.has(value as RatingType)) {
          this.selectedRatings.delete(value as RatingType);
        } else {
          this.selectedRatings.add(value as RatingType);
        }
        break;
      case FilterBy.Categories:
        if (this.selectedCategories.has(value as CatgeroiesType)) {
          this.selectedCategories.delete(value as CatgeroiesType);
        } else {
          this.selectedCategories.add(value as CatgeroiesType);
        }
        break;
    }
    this.applyFilters();
  }

  applyFilters() {
    const filterObj: IFilterSettings = {
      productBrand: [...this.selectedBrands],
      discountOffer: [...this.selectedDiscounts],
      rating: [...this.selectedRatings],
      categories: [...this.selectedCategories],
      price: [...this.selectedPrices],
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

  toggleView(mode: LayoutType): void {
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
    const allProducts = this.dbService.getProducts();
    this.filteredProducts.set(allProducts);
    this.updateProductsForPage();
  }

  private applySort(): void {
    const current = [...this.productes()];
    if (this.sortBy() === SortBy.HighToLow) {
      current.sort((a, b) => b.currentPrice - a.currentPrice);
    } else if (this.sortBy() === SortBy.LowToHigh) {
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
