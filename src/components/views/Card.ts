import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export abstract class Card<T> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(protected container: HTMLElement, protected events?: IEvents) {
    super(container);
    
    this.titleElement = ensureElement<HTMLElement>('.card__title', container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', container);
  }

  set title(value: string) {
    this.setText(this.titleElement, value);
  }

  set price(value: number | null) {
    const priceText = value ? `${value} синапсов` : 'Бесценно';
    this.setText(this.priceElement, priceText);
  }
}