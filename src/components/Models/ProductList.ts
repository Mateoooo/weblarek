import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class ProductList {

  private items: IProduct[] = [];
  private previewItem: IProduct | null = null;

  constructor(protected events: IEvents, initialProducts: IProduct[] = []) {
    this.items = initialProducts;
  }

  setItems(products: IProduct[]): void {
    this.items = products;

    this.events.emit('catalog:changed', { items: this.items });
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItem(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setPreviewItem(item: IProduct): void {
    this.previewItem = item;

    this.events.emit('preview:changed', { item: this.previewItem });
  }

  getPreviewItem(): IProduct | null {
    return this.previewItem;
  }
}