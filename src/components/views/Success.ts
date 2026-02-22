import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

interface ISuccess {
  total: number;
}

export class Success extends Component<ISuccess> {
  protected closeButton: HTMLButtonElement;
  protected description: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
    this.description = ensureElement<HTMLElement>('.order-success__description', container);
    
    this.closeButton.addEventListener('click', () => {
      this.events.emit('success:close');
    });
  }

  set total(value: number) {
    this.setText(this.description, `Списано ${value} синапсов`);
  }

   setClickHandler(handler: () => void) {
      this.closeButton.addEventListener('click', handler);
   }
}