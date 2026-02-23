import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

interface IBasketItem {
  title: string;
  price: number;
  index: number;
}

export class CardBasket extends Card<IBasketItem> {
  protected indexElement: HTMLElement;
  protected deleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, events: IEvents, onDelete: () => void) {
    super(container, events);
    
    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', container);
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);
    
    this.deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      onDelete(); 
    });
  }

  set index(value: number) {
    this.setText(this.indexElement, String(value));
  }

  set price(value: number) {
    this.setText(this.priceElement, `${value} синапсов`);
  }
}