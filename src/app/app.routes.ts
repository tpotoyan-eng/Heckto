// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/homePage/homePage.component';
import { ProductPageComponent } from '../pages/productPage/productPage.component';
import { ProductDetailsPageComponent } from '../pages/productDetailsPage/productDetailsPage.component';
import { BasketPageComponent } from '../pages/basketPage/basketPage.component';
import { LoginPageComponent } from '../pages/loginComponent/login-component';
import { DataBase } from './services/dataBaseService/dataBase';
import { FilterProducts } from './services/filterProductsService/filterProducts';
import { ErrorPageComponent } from '../pages/errorPage/errorPage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'products',
    providers: [DataBase, FilterProducts],
    children: [
      {
        path: '',
        component: ProductPageComponent,
      },
      {
        path: ':id',
        component: ProductDetailsPageComponent,
      },
    ],
  },

  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'basket',
    component: BasketPageComponent,
  },

  {
    path: '**',
    component: ErrorPageComponent,
  },
];
