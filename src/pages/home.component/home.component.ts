import { Component, OnInit, signal } from '@angular/core';
import { DataBase } from '../../app/services/data-base';
import { IProduct } from '../../interfaces/app.model';
import { Product } from '../../app/product/product';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-home.component',
  imports: [Product, NgStyle],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(protected db: DataBase) {}
  featurdProducts = signal<IProduct[]>([]);
  ngOnInit(): void {
    const products = this.db.getFeaturedProducts();
    this.featurdProducts.set(products);
  }
}
