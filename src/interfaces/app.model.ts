export type ProductType = 'Tech' | 'Fashion' | 'Home' | 'Beauty' | 'Sports' | 'Trend';
export type DiscountType = 'HeadPhone' | 'LapTop' | 'Other';

export interface IProduct {
  owner?: string;
  date?: Date;
  Title?: string;
  id: number;
  name: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  description: string;
  url: string;
  type: ProductType;
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
