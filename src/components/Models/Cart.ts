import { IProduct } from '../../types';
import { IEvents } from '../base/Events';

export class Cart {

  private items: IProduct[] = [];

  constructor(protected events: IEvents, initialItems: IProduct[] = []) {
    this.items = initialItems;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  addItem(item: IProduct): void {
    this.items.push(item);

    this.events.emit('cart:changed', { 
      items: this.items,
      total: this.getTotalAmount(),
      count: this.getItemsCount()
    });
  }

  removeItem(item: IProduct): void {
    const index = this.items.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.items.splice(index, 1);

      this.events.emit('cart:changed', { 
        items: this.items,
        total: this.getTotalAmount(),
        count: this.getItemsCount()
      });
    }
  }

  clear(): void {
    this.items = [];

    this.events.emit('cart:changed', { 
      items: this.items,
      total: 0,
      count: 0
    });
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