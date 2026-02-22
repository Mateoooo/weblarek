import { Card } from './Card';
import { IEvents } from '../base/Events';
import { IProduct } from '../../types';
import { ensureElement } from '../../utils/utils'; 

export class CardPreview extends Card<IProduct> {
  protected button: HTMLButtonElement;
  protected isInCart: boolean = false;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container, events);
    this.button = ensureElement<HTMLButtonElement>('.card__button', container);
    
    this.button.addEventListener('click', () => {
      if (this.button.hasAttribute('disabled')) {
        return; 
      }
      this.events.emit(this.isInCart ? 'card:remove' : 'card:add',
         { id: this.container.dataset.id });
    });
  }

  set inCart(value: boolean) {
    this.isInCart = value;

    if (!this.button.hasAttribute('disabled')) {
      this.setText(this.button, value ? 'Удалить из корзины' : 'В корзину');
    }
  }

   set price(value: number | null) {
    super.price = value; 
    
    if (this.button) {
      if (value === null) {
        this.setDisabled(this.button, true);
        this.setText(this.button, 'Недоступно');
      } else {
        this.setDisabled(this.button, false);
        this.setText(this.button, this.isInCart ? 'Удалить из корзины' : 'В корзину');
      }
    }
  }
}