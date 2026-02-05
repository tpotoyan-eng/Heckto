// src/app/header/header.component.ts
import {
  Component,
  OnInit,
  signal,
  inject,
  computed,
  Signal,
  effect,
} from '@angular/core';
import { DiscountComponent } from './discount.component/discount.component';
import { IDiscountProduct } from '../../models/interface';
import { CommonModule } from '@angular/common';
import { FilterProducts } from '../services/filterProductsService/filterProducts';
import { NavigatorService } from '../services/navigatorService/navigatorService';
import { FormsModule } from '@angular/forms';
import { DataBase } from '../services/dataBaseService/dataBase';
import { Currencies , Languages  } from '../../models/enum';
import { ActiveDropdownType } from '../../models/type';

@Component({
  selector: 'app-header',
  imports: [DiscountComponent, CommonModule, FormsModule],
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
  providers: [DataBase],
})
export class HeaderComponent implements OnInit {
  

  private navService = inject(NavigatorService);
  private filterService = inject(FilterProducts);
  private db = inject(DataBase);

  readonly languages = Object.values(Languages);
  readonly currencies = Object.values(Currencies);
  readonly options = ['Login', 'Wishings', 'Basket'];
  readonly optionsImgs = ['white-user.svg', 'white-heart.svg', 'white-basket.svg'];
  readonly navItems = ['Heckto', 'Home', 'Products', 'Blog', 'Contact'];
  readonly dropdownConfigs = computed(() => [
    {
      id: 'lang' as const,
      label: this.selectedLanguage(),
      data: this.languages,
    },
    {
      id: 'curr' as const,
      label: this.selectedCurrency(),
      data: this.currencies,
    },
  ]);

  discountes: IDiscountProduct[] = [];
  currentIndex = signal<number>(0);
  showHero!: Signal<boolean>;
  selectedLanguage = signal(Languages.English);
  selectedCurrency = signal(Currencies.USD);
  searchQuery = signal('');
  activeDropdown = signal<ActiveDropdownType>('none');
  intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      if (this.showHero()) {
        this.startAutoSlide();
      } else {
        this.stopAutoSlide();
      }
    });
  }

  ngOnInit(): void {
    const urlSignal = this.navService.trackRouteChanges();

    this.showHero = computed(() => {
      const url = urlSignal().split('?')[0];
      return url === '/' || url === '/home' || url.endsWith('home');
    });

    this.discountes = this.db.getDiscountedProducts();
  }

  toggleDropdown(menu: ActiveDropdownType) {
    this.activeDropdown.update((prev) => (prev === menu ? 'none' : menu));
  }

  toggleSlide(isNext: boolean) {
    const len = this.discountes.length;
    if (len <= 1) return;
    const step = isNext ? 1 : -1;
    this.currentIndex.update((i) => (i + step + len) % len);
  }

  selectItem(menuId: ActiveDropdownType, value: string) {
    if (menuId === 'lang') {
      this.selectedLanguage.set(value as Languages);
    } else if (menuId === 'curr') {
      this.selectedCurrency.set(value as Currencies);
    }

    this.activeDropdown.set('none');
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex() * 100}%)`;
  }

  handleNavigation(path: string, params?: string) {
    if (path === 'Heckto') path = '';
    this.navService.handleNavigate(path, params);
  }

  goToSlide(index: number) {
    this.currentIndex.set(index);
    this.startAutoSlide();
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

 
}
