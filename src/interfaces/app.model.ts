export type ProductType = 'Tech' | 'Fashion' | 'Home' | 'Beauty' | 'Sports' | 'Trend';
export type DiscountType = 'HeadPhone' | 'LapTop' | 'Other';
export type ProductActionType = 'Basket' | 'Zoom' | 'Like';
export type Layout = 'grid' | 'list';
export type Brend = 'Apple' | 'Sony' | 'Nike' | 'Casio' | 'Vke' | 'Glassiness';
export type DiscountProcent = 20 | 5 | 25;
export type Rating = 1 | 2 | 3 | 4 | 5;
export type Catgeroies =
  | 'Watches'
  | 'Headphones'
  | 'Laptop'
  | 'Game Console'
  | 'Clothe'
  | 'Jewellery'
  | 'Other'
  | 'Perfume';

export type Price = [0, 150] | [150, 350] | [350, 500] | [550, 800] | [800, null];

export interface IProduct {
  owner?: string;
  date?: Date;
  Title?: string;
  _id?: number;
  id: number;
  name: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  description: string;
  url: string;
  type: ProductType;
  quantity?: number;
  brand?: Brend;
  discountOffer?: DiscountProcent;
  category?: Catgeroies;
}

export interface discountProduct {
  smallTitle: string;
  Title: string;
  paragraph: string;
  _id: number;
  imgUrl: string;
  id: number;
  Type: DiscountType;
}

export interface filterSettings {
  ProductBrand: Brend[];
  DiscountOffer: DiscountProcent[];
  Rating: Rating[];
  Categories: Catgeroies[];
  Price: Price[];
}
