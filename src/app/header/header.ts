import { Component, OnInit, OnDestroy, signal, inject, ElementRef, ViewChild } from '@angular/core';
import { DiscountComponent } from './discount.component/discount.component';
import { IDiscountProduct } from '../../Models/inteface';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataBase } from '../services/DataBaseService/data-base';
import { FilterProducts } from '../services/FilterProductsService/filter-products';
import { Currencies, Languages } from '../../Models/enum';
import { NavigatorService } from '../services/NavigatorService/navigator-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DiscountComponent, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header implements OnInit, OnDestroy {
  
  discountes: IDiscountProduct[] = [];
  currentIndex = signal<number>(0);
  showHero = signal<boolean>(true);
  activeDropdown: 'lang' | 'curr' | 'none' = 'none';
  selectedLanguage: string = Languages.English;
  selectedCurrency: string = Currencies.USD;
  searchQuery = signal('');

  private intervalId: ReturnType<typeof setInterval> | null = null;
  private routeSub!: Subscription;
  private router = inject(Router);
  private db = inject(DataBase);
  private filterService = inject(FilterProducts);
  private navService = inject(NavigatorService);

  readonly languages = Object.values(Languages);
  readonly currencies = Object.values(Currencies);
  readonly options = ['Login', 'Wishings', 'Basket'];
  readonly optionsImgs = ['white-user.svg', 'white-heart.svg', 'white-basket.svg'];
  readonly navItems = ['Heckto', 'Home', 'Products', 'Blog', 'Contact'];

  @ViewChild('search') search!: ElementRef;

  ngOnInit(): void {
    this.updateHeroVisibility(this.router.url);
    this.discountes = this.db.getDiscountedProducts();
    this.routeSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.updateHeroVisibility(event.urlAfterRedirects);
      });
  }

  toggleDropdown(menu: 'lang' | 'curr', event: Event) {
    event.stopPropagation();

    if (this.activeDropdown === menu) {
      this.activeDropdown = 'none';
    } else {
      this.activeDropdown = menu;
    }
  }

  handleNavigation(path: string, params?: string) {
    if (path === 'Heckto') {
      path = '';
    }
    this.navService.handleNavigate(path, params);
  }

  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.activeDropdown = 'none';
  }

  selectCurrency(curr: string) {
    this.selectedCurrency = curr;
    this.activeDropdown = 'none';
  }

  toggleSlide(isNext: boolean) {
    const len = this.discountes.length;
    if (len <= 1) return;
    const step = isNext ? 1 : -1;
    this.currentIndex.update((i) => (i + step + len) % len);
  }

  goToSlide(index: number) {
    this.currentIndex.set(index);
    this.startAutoSlide();
  }

  onSearch() {
    this.search.nativeElement.style.transform = 'scale(1)';
  }

  handleSearch() {
    const name = this.searchQuery();
    const index = this.filterService.filterProductsByName(name);
    if (index === -1 || index === null || index === undefined) {
      alert('Item not found');
      return;
    }
    this.handleNavigation('product', index.toString());
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

  private startAutoSlide() {
    this.stopAutoSlide();
    this.intervalId = setInterval(() => {
      this.toggleSlide(true);
    }, 4000);
  }

  private stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
