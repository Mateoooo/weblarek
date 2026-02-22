import { ensureElement } from '../../utils/utils';
import { categoryMap } from '../../utils/constants';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export abstract class Card<T> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  
  protected categoryElement: HTMLElement | null; 
  protected imageElement: HTMLImageElement | null; 
  protected buttonElement: HTMLButtonElement | null; 
  protected descriptionElement: HTMLElement | null; 

  constructor(protected container: HTMLElement, protected events?: IEvents) {
    super(container);
    
    this.titleElement = ensureElement<HTMLElement>('.card__title', container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', container);
    
    this.categoryElement = container.querySelector('.card__category') || null;
    this.imageElement = container.querySelector('.card__image') || null;
    this.buttonElement = container.querySelector('.card__button') || null;
    this.descriptionElement = container.querySelector('.card__text') || null;
  }

  set title(value: string) {
    this.setText(this.titleElement, value);
  }

  set price(value: number | null) {
    const priceText = value ? `${value} синапсов` : 'Бесценно';
    this.setText(this.priceElement, priceText);
  }

  set category(value: string) {
    if (this.categoryElement) {
      this.setText(this.categoryElement, value);
      const modifier = categoryMap[value as keyof typeof categoryMap] || '';
      this.categoryElement.className = `card__category ${modifier}`;
    }
  }

  set image(value: string) {
    if (this.imageElement) {
      this.setImage(this.imageElement, value, this.titleElement.textContent || '');
    }
  }

  set description(value: string) {
    if (this.descriptionElement) {
      this.setText(this.descriptionElement, value);
    }
  }

  set id(value: string) {
    this.container.dataset.id = value;
  }
}