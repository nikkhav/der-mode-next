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

export interface CartItemProps {
  image: string;
  title: string;
  price: number;
  brand: string;
  path: string;
  quantity: number;
  id: string;
  size: string;
}

export interface ItemDetailedProps {
  item: Item;
}

export interface CurrentUserInitialState {
  id: string;
  selectedGender: string;
  isLogged: boolean;
}

export interface CartInitialState {
  items: ICartItem[];
  amount: number;
}

export interface ICartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  brand: string;
  size: string;
  quantity: number;
  gender: string;
  category: string;
}

export interface Item {
  _id: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  images: string[];
  price: number;
  sizes: string[];
  title: string;
  gender: string;
  new: boolean;
}

export interface loginForm {
  email: string;
  password: string;
}

export interface registerForm {
  name: string;
  email: string;
  password: string;
}

export interface OrderForm {
  phone: string;
  streetAndNumber: string;
  entranceAndFloor: string;
  flat: string;
  comment: string;
}
