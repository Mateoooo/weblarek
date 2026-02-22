import { Card } from './Card';
import { IEvents } from '../base/Events';
import { IProduct } from '../../types';

export class CardCatalog extends Card<IProduct> {
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);
    
    this.container.addEventListener('click', () => {
      this.events.emit('card:select', { id: this.container.dataset.id });
    });
  }
}