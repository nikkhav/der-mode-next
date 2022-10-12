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
