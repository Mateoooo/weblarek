import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

interface IBasketItem {
  id: string;
  title: string;
  price: number;
  index: number;
}

export class CardBasket extends Card<IBasketItem> {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);
    
    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
    
    this.deleteButton.addEventListener('click', () => {
      this.events.emit('basket:remove', { id: this.container.dataset.id });
    });
  }

  set index(value: number) {
    this.setText(this.indexElement, String(value));
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }
}