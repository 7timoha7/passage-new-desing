export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  token?: string;
  favorites: string[];
  isVerified: boolean;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface RegisterMutation extends LoginMutation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _name: string;
}

export interface GlobalError {
  error: string;
}

export interface GlobalSuccess {
  message: {
    ru: string;
    en: string;
  };
}

export interface CategoriesType {
  _id: string;
  name: string;
}

export interface ProductType {
  _id: string;
  categoryId: string;
  name: string;
  desc?: string;
  unit: string;
  vendorCode: number;
  group: string;
  cod: string;
  dimensions: string;
  weight: string;
  images: string[];
  price: number;
}

export interface ImgType {
  image: File | null;
}

export interface ProductTypeMutation {
  _id: string;
  categoryId: string;
  name: string;
  desc?: string;
  unit: string;
  vendorCode: number;
  group: string;
  cod: string;
  dimensions: string;
  weight: string;
  images?: File[];
  price: number;
}

export interface ProductBasketType extends ProductType {
  quantity: number;
}

export interface CabinetState {
  [key: string]: boolean;
}

export interface BasketTypeToServer {
  user_id?: string;
  session_key?: string;
  items: {
    product: string;
    quantity: number;
  }[];
  totalPrice: number;
}

export interface BasketTypeOnServerMutation {
  _id: string;
  user_id?: string;
  session_key?: string;
  items: {
    _id: string;
    product: ProductType;
    quantity: number;
  }[];
  totalPrice: number;
}

interface BasketUpdateRequest {
  sessionKey?: string;
  product_id?: string;
  action: 'increase' | 'decrease' | 'remove' | 'clear';
}
