import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

interface IBasket {
  items: HTMLElement[];
  total: number;
}

export class Basket extends Component<IBasket> {
  protected list: HTMLElement;
  protected totalElement: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    
    this.list = ensureElement<HTMLElement>('.basket__list', container);
    this.totalElement = ensureElement<HTMLElement>('.basket__price', container);
    this.button = ensureElement<HTMLButtonElement>('.basket__button', container);
    
    this.button.addEventListener('click', () => {
      this.events.emit('basket:order');
    });
  }

  set items(items: HTMLElement[]) {
    this.list.innerHTML = '';
    items.forEach(item => this.list.appendChild(item));
  }

  set total(value: number) {
    this.setText(this.totalElement, `${value} синапсов`);
  }

  set buttonDisabled(value: boolean) {
    this.setDisabled(this.button, value);
  }
}