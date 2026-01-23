import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { DiscountComponent } from './discount.component/discount.component';
import { discountProduct } from '../../interfaces/app.model';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataBase } from '../services/data-base';

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

  private intervalId: any;
  private routeSub!: Subscription;
  private router = inject(Router);
  private db = inject(DataBase);

  ngOnInit(): void {
    this.updateHeroVisibility(this.router.url);
    this.discountes = this.db.getDiscountedProducts();
    this.routeSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('URL changed:', event.urlAfterRedirects);
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
}
