import { Component, OnInit, signal } from '@angular/core';
import { DiscountComponent } from './discount.component/discount.component';
import { discountProduct } from '../../interfaces/app.model';
import { DataBase } from '../services/data-base';
@Component({
  selector: 'app-header',
  imports: [DiscountComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header implements OnInit {
  discountes: discountProduct[] = [];
  currentIndex = signal<number>(0);
  constructor(protected db: DataBase) {}

  ngOnInit(): void {
    this.discountes = this.db.getDiscountedProducts();

    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  goToSlide(index: number) {
    this.currentIndex.set(index);
  }

  nextSlide() {
    const val = (this.currentIndex() + 1) % this.discountes.length;
    this.currentIndex.set(val);
  }

  prevSlide() {
    const val = (this.currentIndex() + 1) % this.discountes.length;
    this.currentIndex.set(val);
  }
}
