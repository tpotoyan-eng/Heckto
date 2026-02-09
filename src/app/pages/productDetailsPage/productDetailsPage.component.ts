// src/app/pages/productDetailsPage/productDetailsPage.component.ts
// src/pages/productDetailsPage/productDetailsPage.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProduct } from '../../models/interface';
import { ActivatedRoute } from '@angular/router';
import { DataBase } from '../../services/dataBaseService/dataBase';
import { ProductComponent } from '../../product/product.component';
import { CommonModule } from '@angular/common';
import { NavigatorService } from '../../services/navigatorService/navigatorService';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IFormInput, IProductNav, IDiscountNavItem } from '../../models/interface';
import { Helper } from '../../helpers/helperClass';

@Component({
  selector: 'app-product-details-component',
  imports: [ProductComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './productDetailsPage.component.html',
  styleUrl: './productDetailsPage.component.scss',
  providers: [DataBase],
})
export class ProductDetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dbService = inject(DataBase);
  private navigator = inject(NavigatorService);

  readonly defaultStarCount = 5;
  readonly cartFormInfo: IFormInput[] = Helper.getCartFormInfo();
  readonly productDetailsNav: IProductNav[] = Helper.getProductDetailsNav();
  readonly discountNavItems: IDiscountNavItem[] = Helper.getDiscountNavItems();
  readonly productMoreDetailsInfo = Helper.getProductMoreDetailsInfo();

  paymentForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9 ]*$')]),
    expDate: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    holderName: new FormControl('', [Validators.required]),
  });

  product = signal<null | IProduct | null>(null);
  starsCount = signal<number>(0);
  stars = signal<boolean[]>([]);
  similarItems = signal<IProduct[]>([]);
  showCard = signal(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((routObj) => {
      const Productid = routObj.get('id');
      if (Productid != null) {
        this.configProps(+Productid);
      } else {
        this.navigator.handleNavigate('');
      }
    });
  }
  handleNavigation() {}

  addToCard(showCard: boolean) {
    this.showCard.set(showCard);
  }

  onPay() {
    console.log(this.paymentForm);
    if (this.paymentForm.valid) {
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

  closeCardForm() {
    this.showCard.set(false);
  }

  private configProps(Productid: number) {
    this.product.set(this.dbService.getProductById(+Productid));
    const Product: IProduct | null = this.product();

    if (Product == null) {
      alert('Product Not found');
      return;
    }

    this.starsCount.set(Product.rating ?? 0);

    const similarItems: IProduct[] = this.dbService.getSimilarItems(Product.name) ?? [];
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
  }
}
