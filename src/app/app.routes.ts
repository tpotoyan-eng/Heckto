import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/homePage/homePage.component';
import { ProductPage } from '../pages/productPage/productPage.component';
import { ProductDetailsComponent } from '../pages/productDetailsPage/productDetailsPage.component';
import { BasketComponent } from '../pages/basketPage/basketPage.component';
import { LoginComponent } from '../pages/loginComponent/login-component';
import { DataBase } from './services/DataBaseService/dataBase';
import { FilterProducts } from './services/FilterProductsService/filterProducts';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
        component: ProductPage,
      },
      {
        path: ':id',
        component: ProductDetailsComponent,
      },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'basket',
    component: BasketComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
