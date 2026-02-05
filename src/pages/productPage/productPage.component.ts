// src/pages/productPage/productPage.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProduct , ICategories  , IBrandDescription , IFilterSettings , IFilterGroupConfig}  from '../../models/interface';
import { DataBase } from '../../app/services/dataBaseService/dataBase';
import { CommonModule } from '@angular/common';
import { ShopProduct } from '../../app/shopProduct/shopProduct.component';
import {
  BrendType,
  DiscountProcentType,
  RatingType,
  CatgeroiesType,
  PriceType,
} from '../../models/type';

import { FilterProducts } from '../../app/services/filterProductsService/filterProducts';
import { BrandNames, FilterBy } from '../../models/enum';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, ShopProduct],
  templateUrl: './productPage.component.html',
  styleUrl: './productPage.component.scss',
  providers: [DataBase]
})
export class ProductPageComponent implements OnInit {
  
  private filterService = inject(FilterProducts);
  private db = inject(DataBase);
  
  readonly discountOffer : IBrandDescription[]  = [
    { id : '' ,value: 5, lable: '5%' },
    {id : '' ,  value: 20, lable: '20%' },
    {id : '' , value: 25, lable: '25%' }
  ];
  readonly filterBy = FilterBy;
  readonly categories : ICategories[] = [
    { id: 'cat-watches', label: 'Watches', value: 'Watches' },
    { id: 'cat-headphones', label: 'Headphones', value: 'Headphones' },
    { id: 'cat-laptop', label: 'Laptop', value: 'Laptop' },
    { id: 'cat-game', label: 'Game Console', value: 'Game Console' },
    { id: 'cat-jewellery', label: 'Jewellery', value: 'Jewellery' },
    { id: 'cat-perfume', label: 'Perfume', value: 'Perfume' }
  ];
  readonly brandOptions = this.getBrandNames()
  readonly ratings = [
    [true, false, false, false, false],
    [true, true, false, false, false],
    [true, true, true, false, false],
    [true, true, true, true, false],
    [true, true, true, true, true],
  ];
  readonly priceRanges  = [
  { id: 'p1', label: '$0 - $150', min: 0, max: 150 },
  { id: 'p2', label: '$150 - $350', min: 150, max: 350 },
  { id: 'p3', label: '$350 - $500', min: 350, max: 500 },
  { id: 'p4', label: '$550 - $800', min: 550, max: 800 },
  { id: 'p5', label: '$800+', min: 800, max: undefined },
];
  readonly filterGroups : IFilterGroupConfig[] = [
    {title : 'Product Brand' ,type : FilterBy.ProductBrand , options : this.brandOptions},
    {title : 'Discount offer' ,type : FilterBy.DiscountOffer , options : this.discountOffer},
    {title : 'Rating' ,type : FilterBy.Rating , options : this.ratings},
    {title : 'Categories' ,type : FilterBy.Categories , options : this.categories},
    {title : 'Price Filter' ,type : FilterBy.PriceFilter , options : this.priceRanges},
  ]
  readonly brands = ['Casio', 'Apple', 'Sony', 'Nike'];

  perPageArr: number[] = [];
  productes = signal<IProduct[]>([]);
  viewMode = signal<'grid' | 'list'>('grid');
  sortBy = signal<string>('high-low');
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
    console.log(this.selectedCategories);
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

  private getBrandNames() {
    const values = Object.keys(BrandNames);
    const result: IBrandDescription[] = [];
    values.forEach(brend => {
      const brendDescription = {
        id : brend.toLowerCase(),
        lable : brend,
        value : brend,
      }
      result.push(brendDescription);
    })
    console.log(result)
    return result;
  }
  
}
