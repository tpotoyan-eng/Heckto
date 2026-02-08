// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homePage/homePage.component';
import { ProductPageComponent } from './pages/productPage/productPage.component';
import { ProductDetailsPageComponent } from './pages/productDetailsPage/productDetailsPage.component';
import { BasketPageComponent } from './pages/basketPage/basketPage.component';
import { LoginPageComponent } from './pages/loginComponent/login-component';
import { DataBase } from './services/dataBaseService/dataBase';
import { FilterProducts } from './services/filterProductsService/filterProducts';
import { ErrorPageComponent } from './pages/errorPage/errorPage.component';
import { AppRoutes } from './models/enum';

export const routes: Routes = [
  {
    path: AppRoutes.Home,
    component: HomePageComponent,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.HomeAlias,
    redirectTo: AppRoutes.Home,
  },
  {
    path: AppRoutes.Products,
    providers: [DataBase, FilterProducts],
    children: [
      {
        path: AppRoutes.Home,
        component: ProductPageComponent,
      },
      {
        path: AppRoutes.ProductDetails,
        component: ProductDetailsPageComponent,
      },
    ],
  },
  {
    path: AppRoutes.Login,
    component: LoginPageComponent,
  },
  {
    path: AppRoutes.Basket,
    component: BasketPageComponent,
  },
  {
    path: AppRoutes.NotFound,
    component: ErrorPageComponent,
  },
];
