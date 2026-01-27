import { discountProduct, IProduct } from '../interfaces/app.model';

export const PRODUCTS: Array<IProduct> = [
  {
    id: 0,
    name: 'Watches',
    currentPrice: 42.0,
    originalPrice: 62.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'watch1.svg',
    type: 'Tech',
  },
  {
    id: 1,
    name: 'Watches',
    currentPrice: 42.0,
    originalPrice: 64.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: '/watch2.svg',
    type: 'Tech',
  },
  {
    id: 2,
    name: 'Headphones',
    currentPrice: 90.0,
    originalPrice: 99.0,
    rating: 3,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'HeadPoint1.svg',
    type: 'Tech',
  },
  {
    id: 3,
    name: 'Laptop',
    currentPrice: 89.0,
    originalPrice: 99.0,
    rating: 2,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'playstation.svg',
    type: 'Tech',
  },
  {
    id: 4,
    name: 'Black watches',
    currentPrice: 35.0,
    originalPrice: 55.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'watch2.svg',
    type: 'Fashion',
  },
  {
    id: 5,
    name: 'Game console',
    currentPrice: 76.0,
    originalPrice: 89.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'playstation.svg',
    type: 'Trend',
  },
  {
    id: 6,
    name: 'Shoes',
    currentPrice: 57.0,
    originalPrice: 75.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'shoes1.svg',
    type: 'Trend',
  },
  {
    id: 7,
    name: 'chaire',
    currentPrice: 39,
    originalPrice: 60,
    rating: 5,
    description: 'Unique Features Of leatest & Trending Poducts',
    url: 'Chaire-blue.svg',
    type: 'Home',
  },
  {
    id: 8,
    name: 'Game console',
    currentPrice: 76.0,
    originalPrice: 89.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'playstation.svg',
    type: 'Trend',
  },
  {
    id: 9,
    name: 'Game console',
    currentPrice: 76.0,
    originalPrice: 89.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'playstation.svg',
    type: 'Trend',
  },
];

export const DISCOUNT_PRODUCTS: discountProduct[] = [
  {
    _id: 3,
    smallTitle: 'Ultimate Gaming Experience',
    Title: 'Next-Gen Gaming \n Control Systems',
    paragraph:
      'Take your gaming to the next level with high-precision controllers and lightning-fast response times.',
    imgUrl: 'playstation.svg',
    id: 8,
    Type: 'LapTop',
  },
  {
    _id: 1,
    smallTitle: 'Premium Home Furniture Collection',
    Title: 'Elegant Blue Velvet \n Accent Chairs',
    paragraph:
      'Enhance your living space with our latest ergonomic designs. Crafted for comfort and styled for the modern home.',
    imgUrl: 'Chaire-blue.svg',
    id: 7,
    Type: 'Other',
  },
  {
    _id: 2,
    Title: '20% Discount Of All Products',
    smallTitle: 'Headphones Compact',
    paragraph:
      'Experience immersive sound quality and noise cancellation. Perfect for music lovers and professionals alike.',
    imgUrl: 'hero-HeadPoint.svg',
    id: 2,
    Type: 'HeadPhone',
  },
];

export const TOP_CATEGORIES: IProduct[] = [
  {
    id: 0,
    name: 'Perfum',
    currentPrice: 42.0,
    originalPrice: 62.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'Perfume1.svg',
    type: 'Fashion',
  },
  {
    id: 1,
    name: 'Ring',
    currentPrice: 42.0,
    originalPrice: 62.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'Ring.svg',
    type: 'Trend',
  },
  {
    id: 2,
    name: 'present-box',
    currentPrice: 42.0,
    originalPrice: 62.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'present-box.svg',
    type: 'Tech',
  },
  {
    id: 3,
    name: 'Braslet',
    currentPrice: 42.0,
    originalPrice: 62.0,
    rating: 4,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.',
    url: 'braslet.svg',
    type: 'Tech',
  },
];

export const HOMES: IProduct[] = [
  {
    id: 0,
    owner: 'Jon Doe',
    date: new Date('2023-08-21'), // YYYY-MM-DD
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit hendrerit ex.',
    url: 'Home-trand1.svg',
    type: 'Home',
    rating: 5,
    name: 'Home',
    Title: 'Top essential Trends in 2023',
    currentPrice: 211,
    originalPrice: 232,
  },
  {
    id: 1,
    owner: 'Jon Doe',
    date: new Date('2023-08-21'),
    description:
      'Nullam nec fringilla erat, ac dapibus nunc. Integer semper ipsum in fermentum aliquam. ',
    url: 'Home-trand2.svg',
    type: 'Home',
    rating: 5,
    name: 'Home',
    Title: 'Top essential Trends in 2023',
    currentPrice: 211,
    originalPrice: 232,
  },
  {
    id: 2,
    owner: 'Jon Doe',
    date: new Date('2023-08-21'),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit hendrerit ex.',
    url: 'home-trand3.svg',
    type: 'Home',
    rating: 5,
    name: 'Home',
    Title: 'Top essential Trends in 2023',
    currentPrice: 211,
    originalPrice: 232,
  },
];
