export interface PhotoCardProps {
  image: string;
  title: string;
  path: string;
}

export interface ProductsPageProps {
  gender: string;
}

export interface ItemCardProps {
  image: string;
  title: string;
  price: number;
  brand: string;
}

export interface CurrentUserSlice {
  id: string;
  selectedGender: string;
  isLogged: boolean;
}

export interface Item {
  _id: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  image: string;
  price: number;
  sizes: string[];
  title: string;
}
