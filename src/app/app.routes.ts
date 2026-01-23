import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home.component/home.component';
import { ProductDescrition } from '../pages/product-descritiom/product-descritiom';

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
    path: 'product/:id',
    component: ProductDescrition,
  },
];
