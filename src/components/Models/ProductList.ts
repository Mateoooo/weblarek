import { IProduct } from '../../types';

export class ProductList {

  private items: IProduct[] = [];
  private previewItem: IProduct | null = null;

  constructor(initialProducts: IProduct[] = []) {
    this.items = initialProducts;
  }

  setItems(products: IProduct[]): void {
    this.items = products;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  getItem(id: string): IProduct | undefined {
    return this.items.find(item => item.id === id);
  }

  setPreviewItem(item: IProduct): void {
    this.previewItem = item;
  }

  getPreviewItem(): IProduct | null {
    return this.previewItem;
  }
}