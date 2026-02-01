export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type TPayment = 'online' | 'offline';

export type ValidationResult = {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
};

// Интерфейс для данных заказа
export interface IOrder {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[]; 
}

// Интерфейс для результата отправки заказа
export interface IOrderResult {
  id: string;
  total: number;
}

// Интерфейс для ответа сервера с товарами
export interface IApiListResponse<T> {
  total: number;
  items: T[];
}