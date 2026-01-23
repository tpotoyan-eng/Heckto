export type ProductType = 'Tech' | 'Fashion' | 'Home' | 'Beauty' | 'Sports';
export interface IProduct {
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
}
