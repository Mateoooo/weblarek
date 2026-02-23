import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { categoryMap } from '../../utils/constants';
import { IProduct } from '../../types';

export class CardPreview extends Card<IProduct> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected descriptionElement: HTMLElement;
  protected button: HTMLButtonElement;

  constructor(container: HTMLElement,events: IEvents,private onButtonClick: () => void) {
    super(container, events);
    
    this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', container);
    this.button = ensureElement<HTMLButtonElement>('.card__button', container);
    
    this.button.addEventListener('click', () => {
      this.onButtonClick();
    });
  }

  set category(value: string) {
    this.setText(this.categoryElement, value);
    const modifier = categoryMap[value as keyof typeof categoryMap] || '';
    this.categoryElement.className = `card__category ${modifier}`;
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }

  set description(value: string) {
    this.setText(this.descriptionElement, value);
  }

  set buttonText(value: string) {
    this.setText(this.button, value);
  }

  set buttonDisabled(value: boolean) {
    this.setDisabled(this.button, value);
  }
}