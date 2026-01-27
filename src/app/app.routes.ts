import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home.component/home.component';
import { ProductDescrition } from '../pages/product-descritiom/product-descritiom';
import { LoginComponent } from './login-component/login-component';
import { BasketComponent } from '../pages/basket.component/basket.component';
import { ProductPage } from '../pages/product-page/product-page';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    redirectTo: '',
  },
  {
    path: 'products/:id',
    component: ProductDescrition,
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
    path: 'products',
    component: ProductPage,
  },
];
