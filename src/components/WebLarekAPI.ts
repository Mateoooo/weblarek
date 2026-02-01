import { IProduct, IOrder, IOrderResult, IApiListResponse, IApi } from '../types';

export class WebLarekAPI {

  constructor( protected api: IApi) { 
    console.log(' WebLarekAPI инициализирован');
  }

  getProductList(): Promise<IProduct[]> {
    return this.api.get<IApiListResponse<IProduct>>('/product')
      .then(response => response.items);
  }

  submitOrder(orderData: IOrder): Promise<IOrderResult> {
    console.log('Отправка заказа на сервер: ', orderData);
    return this.api.post<IOrderResult>('/order', orderData)
      .then(response => {
        console.log('Заказ успешно создан:', response);
        return response;
      });
  }
}