import { Component, inject, OnInit, signal } from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBase } from '../../app/services/data-base';
import { Product } from '../../app/product/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details-component',
  imports: [Product, CommonModule],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product = signal<null | IProduct | null>(null);
  starsCount = signal<number>(0);
  stars = signal<boolean[]>([]);
  similarItems = signal<IProduct[]>([]);
  showCard = signal(false);

  readonly defaultStarCount = 5;
  private route = inject(ActivatedRoute);
  private db = inject(DataBase);
  private navigator = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.subscribe((routObj) => {
      const Productid = routObj.get('id');
      if (Productid != null) {
        this.configProps(+Productid);
      } else {
        this.navigator.navigate(['']);
      }
      console.log(this.product());
    });
  }

  addToCard(showCard: boolean) {
    this.showCard.set(showCard);
  }

  closeCardForm() {
    this.showCard.set(false);
  }

  private configProps(Productid: number) {
    this.product.set(this.db.getProductById(+Productid));
    const Product: IProduct | null = this.product();

    if (Product == null) {
      alert('Product Not found');
      return;
    }
    this.starsCount.set(Product.rating ?? 0);

    const similarItems: IProduct[] = this.db.getSimilarItems(Product.name) ?? [];
    const rating: number = this.product()?.rating ?? 0;
    this.similarItems.set(similarItems);
    if (this.starsCount() != null) {
      for (let i = 1; i <= this.defaultStarCount; ++i) {
        if (i <= rating) {
          this.stars().push(true);
        } else {
          this.stars().push(false);
        }
      }
    }

    console.log(this.stars());
  }
}
