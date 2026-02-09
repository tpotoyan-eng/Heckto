// src/app/header/header.component.ts
import {
  Component,
  OnInit,
  signal,
  inject,
  computed,
  Signal,
  effect,
  ElementRef,
  HostListener,
} from '@angular/core';
import { DiscountComponent } from './discount.component/discount.component';
import { IDiscountProduct, IMenuOption } from '../models/interface';
import { CommonModule } from '@angular/common';
import { FilterProducts } from '../services/filterProductsService/filterProducts';
import { NavigatorService } from '../services/navigatorService/navigatorService';
import { FormsModule } from '@angular/forms';
import { DataBase } from '../services/dataBaseService/dataBase';
import { ActiveDropdownType } from '../models/type';
import { MenuOptions, Currencies, Languages, AppRoutes } from '../models/enum';
import { Helper } from '../helpers/helperClass';

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
  private dbService = inject(DataBase);
  private eRef = inject(ElementRef);

  readonly menuOptionsEnum = MenuOptions;
  readonly languages = Object.values(Languages);
  readonly currencies = Object.values(Currencies);
  readonly menuOptions = Helper.getMenuOptions();
  readonly navItems = Helper.getRouteMenu();
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

  activeNavIndex = signal<number>(-1);
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
      return url === '/' || url === `/${AppRoutes.HomeAlias}` || url.endsWith(AppRoutes.HomeAlias);
    });

    this.discountes = this.dbService.getDiscountedProducts();
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (this.activeDropdown() !== 'none' && !this.eRef.nativeElement.contains(event.target)) {
      this.activeDropdown.set('none');
    }
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

  isActiveNav(index: number): boolean {
    return this.activeNavIndex() === index;
  }

  handleNavigation(path: string, params?: string, index = -1) {
    if (path === AppRoutes.Heckto) path = AppRoutes.Home;

    this.navService.handleNavigate(path, params);

    if (index === 0) return this.activeNavIndex.set(-1);

    this.activeNavIndex.set(index);
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
    this.handleNavigation(AppRoutes.Products, index.toString());
  }

  isBasket(option: IMenuOption): boolean {
    return option.optionName === this.menuOptionsEnum.Basket;
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
