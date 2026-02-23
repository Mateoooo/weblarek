import { Card } from './Card';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';
import { categoryMap } from '../../utils/constants';

interface ICardCatalog {
  title: string;
  price: number | null;
  category: string;
  image: string;
}

export class CardCatalog extends Card<ICardCatalog> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;

  constructor(container: HTMLElement, events: IEvents, onClick: () => void) {
    super(container, events);
    
    this.categoryElement = ensureElement<HTMLElement>('.card__category', container);
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', container);
    
    container.addEventListener('click', onClick); 
  }

  set category(value: string) {
    this.setText(this.categoryElement, value);
    const modifier = categoryMap[value as keyof typeof categoryMap] || '';
    this.categoryElement.className = `card__category ${modifier}`;
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }
}