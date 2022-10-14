export interface PhotoCardProps {
  image: string;
  title: string;
  path: string;
}

export interface ProductsPageProps {
  gender: string;
  items: Item[];
}

export interface ProductsIndexPageProps {
  items: Item[];
}

export interface ItemCardProps {
  image: string;
  title: string;
  price: number;
  brand: string;
  path: string;
}

export interface ItemDetailedProps {
  item: Item;
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
  gender: string;
}
