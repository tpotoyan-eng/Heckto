// src/pages/productDetailsPage/productDetailsPage.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProduct } from '../../models/interface';
import { ActivatedRoute } from '@angular/router';
import { DataBase } from '../../app/services/DataBaseService/dataBase';
import { ProductComponent } from '../../app/product/product.component';
import { CommonModule } from '@angular/common';
import { NavigatorService } from '../../app/services/NavigatorService/navigatorService';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details-component',
  imports: [ProductComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './productDetailsPage.component.html',
  styleUrl: './productDetailsPage.component.scss',
  providers: [DataBase],
})
export class ProductDetailsPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private db = inject(DataBase);
  private navigator = inject(NavigatorService);

  readonly cartFormInfo = [
    {
      name: 'cardNumber',
      placeholder: '1234 5678 9012 3456',
      type: 'text',
      labelValue: 'Card Number',
      maxlength: '19',
    },
    {
      name: 'expDate',
      placeholder: 'MM/YY',
      type: 'text',
      labelValue: 'Expiration Date',
      maxlength: '5',
    },
    { name: 'cvv', placeholder: '123', type: 'text', labelValue: 'CVV', maxlength: '3' },
    {
      name: 'holderName',
      placeholder: 'John Doe',
      type: 'text',
      labelValue: 'Card Holder Name',
      maxlength: '',
    },
  ];
  readonly defaultStarCount = 5;
  readonly productDetailsNav = [
    { className: 'active', value: 'Description' },
    { className: '', value: 'Additional Info' },
    { className: '', value: 'Reviews' },
    { className: '', value: 'Video' },
  ];
  readonly productMoreDetailsInfo = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac quam dolor. Indignissim lectus sed nisl tempor, ac porttitor libero consectetur.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac quam dolor. Indignissim lectus sed nisl tempor, ac porttitor libero consectetur.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac quam dolor. Indignissim lectus sed nisl tempor, ac porttitor libero consectetur.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac quam dolor. Indignissim lectus sed nisl tempor, ac porttitor libero consectetur.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac quam dolor. Indignissim lectus sed nisl tempor, ac porttitor libero consectetur.',
  ];

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
      console.log('Payment Data:', this.paymentForm.value);
    } else {
      alert('Please fill in all fields correctly.');
    }
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
  }
}
