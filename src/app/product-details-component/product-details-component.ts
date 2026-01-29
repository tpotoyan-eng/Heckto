import { Component, inject, OnInit, signal } from '@angular/core';
import { IProduct } from '../../interfaces/app.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBase } from '../services/data-base';

@Component({
  selector: 'app-product-details-component',
  imports: [],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product = signal<undefined | IProduct | null>(null);
  private route = inject(ActivatedRoute);
  private db = inject(DataBase);
  private navigator = inject(Router);

  ngOnInit(): void {
    this.route.paramMap.subscribe((routObj) => {
      const Productid = routObj.get('id');
      if (Productid != null) {
        this.product.set(this.db.getProductById(+Productid));
      } else {
        this.navigator.navigate(['']);
      }
    });
  }
}
