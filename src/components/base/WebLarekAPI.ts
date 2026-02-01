import { Api } from '../../components/base/Api';
import { IProduct, IOrder, IOrderResult, IApiListResponse } from '../../types';

export class WebLarekAPI {

  private api: Api;

  constructor(baseUrl: string, options: RequestInit = {}) {
    this.api = new Api(baseUrl, options);
  }

  getProductList(): Promise<IProduct[]> {
    return this.api.get<IApiListResponse<IProduct>>('/product')
      .then(response => {
        console.log('Получены данные с сервера: ', {
          total: response.total,
          itemsCount: response.items.length
        });
        return response.items;
      });
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