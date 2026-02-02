import { Component, OnInit, OnDestroy, signal, inject, ElementRef, ViewChild } from '@angular/core';
import { DiscountComponent } from './discount.component/discount.component';
import { discountProduct } from '../../interfaces/app.model';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataBase } from '../services/DataBaseService/data-base';
import { FilterProducts } from '../services/FilterProducts-service/filter-products';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DiscountComponent, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header implements OnInit, OnDestroy {
  discountes: discountProduct[] = [];
  currentIndex = signal<number>(0);
  showHero = signal<boolean>(true);
  @ViewChild('search') search!: ElementRef;
  private intervalId: any;
  private routeSub!: Subscription;
  private router = inject(Router);
  private db = inject(DataBase);
  private filterService = inject(FilterProducts);

  activeDropdown: 'lang' | 'curr' | 'none' = 'none';

  readonly languages = ['English', 'Spanish', 'French'];
  readonly currencies = ['USD', 'EUR', 'GBP'];

  selectedLanguage = 'English';
  selectedCurrency = 'USD';

  toggleDropdown(menu: 'lang' | 'curr', event: Event) {
    event.stopPropagation();

    if (this.activeDropdown === menu) {
      this.activeDropdown = 'none';
    } else {
      this.activeDropdown = menu;
    }
  }

  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.activeDropdown = 'none';
  }

  selectCurrency(curr: string) {
    this.selectedCurrency = curr;
    this.activeDropdown = 'none';
  }
  ngOnInit(): void {
    this.updateHeroVisibility(this.router.url);
    this.discountes = this.db.getDiscountedProducts();
    this.routeSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateHeroVisibility(event.urlAfterRedirects);
      });
  }

  private updateHeroVisibility(url: string) {
    const isHome = url === '/' || url === '/home' || url === 'home';
    this.showHero.set(isHome);

    if (isHome) {
      this.startAutoSlide();
    } else {
      this.stopAutoSlide();
    }
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  nextSlide() {
    if (this.discountes.length === 0) return;
    const val = (this.currentIndex() + 1) % this.discountes.length;
    this.currentIndex.set(val);
  }

  prevSlide() {
    if (this.discountes.length === 0) return;
    const val = (this.currentIndex() - 1 + this.discountes.length) % this.discountes.length;
    this.currentIndex.set(val);
  }

  goToSlide(index: number) {
    this.currentIndex.set(index);
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  onSearch() {
    this.search.nativeElement.style.transform = 'scale(1)';
  }

  handleSearch(element: HTMLInputElement) {
    const name = element.value.trim();

    if (!name) return;

    const index = this.filterService.filterProductsByName(name);

    if (index === -1 || index === null || index === undefined) {
      alert('Item not found');
      return;
    }

    this.router.navigate(['product', index]);
  }
}
