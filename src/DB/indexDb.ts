class Product {
  brand: string | null;
  discountOffer: number;
  rating: number;
  categories: string;
  img: string;
  price: string;
  like: number;
  smallDescription: string;
  constructor(
    brand: string | null = null,
    discountOffer: number = 0,
    rating: number = 0,
    categories: string = '',
    img: string = '',
    price: string = '',
    like: number = 0,
    smallDescription: string = ''
  ) {
    this.brand = brand;
    this.discountOffer = discountOffer;
    this.rating = rating;
    this.categories = categories;
    this.img = img;
    this.price = price;
    this.like = like;
    this.smallDescription = smallDescription;
  }
}

const products = [];
