import { IProduct } from '../../../types';

export class ProductList {

  private _items: IProduct[] = [];
  private _previewItem: IProduct | null = null;

  constructor(initialProducts: IProduct[] = []) {
    this._items = initialProducts;
  }

  setItems(products: IProduct[]): void {
    this._items = products;
  }

  getItems(): IProduct[] {
    return this._items;
  }

  getItem(id: string): IProduct | undefined {
    return this._items.find(item => item.id === id);
  }

  setPreviewItem(item: IProduct): void {
    this._previewItem = item;
  }

  getPreviewItem(): IProduct | null {
    return this._previewItem;
  }
}