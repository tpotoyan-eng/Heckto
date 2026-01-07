import { url } from 'inspector';
import { discountProduct, Product } from '../interfaces/app.model';

export let data: Array<Product> = [
  {
    name: 'Watches',
    currentPrice: 42.0,
    originalPrice: 62.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: '../shared/watch1.svg',
  },
  {
    name: 'Watches',
    currentPrice: 42.0,
    originalPrice: 64.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: '../shared/watch2.svg',
  },
  {
    name: 'Headphones',
    currentPrice: 90.0,
    originalPrice: 99.0,
    rating: 3,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: '../shared/HeadPoint1.svg',
  },
  {
    name: 'Laptop',
    currentPrice: 89.0,
    originalPrice: 99.0,
    rating: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: '../shared/playstation.svg',
  },
  {
    name: 'Black watches',
    currentPrice: 35.0,
    originalPrice: 55.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: '../shared/watch2.svg',
  },
  {
    name: 'Game console',
    currentPrice: 76.0,
    originalPrice: 89.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: '../shared/playstation.svg',
  },
  {
    name: 'Shoes',
    currentPrice: 57.0,
    originalPrice: 75.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: '../shared/shoes1.svg',
  },
];

export const DISCOUNT_PRODUCTS: discountProduct[] = [
  {
    _id: 1,
    smallTitle: 'Best Headphones For Your Life....',
    Title: 'New Trendy Collection Headphones',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    imgUrl: 'hero-HeadPoint.svg',
  },
  {
    _id: 1,
    smallTitle: 'Best Headphones For Your Life....',
    Title: 'New Trendy Collection Headphones',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    imgUrl: 'hero-HeadPoint.svg',
  },
  {
    _id: 1,
    smallTitle: 'Best Headphones For Your Life....',
    Title: 'New Trendy Collection Headphones',
    paragraph:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    imgUrl: 'hero-HeadPoint.svg',
  },
];
