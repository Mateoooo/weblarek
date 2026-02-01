import { IProduct } from '../../types';

export class Cart {

  private items: IProduct[] = [];

  constructor(initialItems: IProduct[] = []) {
    this.items = initialItems;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  addItem(item: IProduct): void {
    this.items.push(item);
  }

  removeItem(item: IProduct): void {
    const index = this.items.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  clear(): void {
    this.items = [];
  }

  getTotalAmount(): number {
    return this.items.reduce((total, item) => {
      return total + (item.price || 0);
    }, 0);
  }

  getItemsCount(): number {
    return this.items.length;
  }

  contains(itemId: string): boolean {
    return this.items.some(item => item.id === itemId);
  }
}