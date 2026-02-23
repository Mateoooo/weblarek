import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';

interface ISuccess {
  total: number;
}

export class Success extends Component<ISuccess> {
  protected closeButton: HTMLButtonElement;
  protected description: HTMLElement;

  constructor(container: HTMLElement, onClose: () => void) {
    super(container);
    
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
    this.description = ensureElement<HTMLElement>('.order-success__description', container);
    
    this.closeButton.addEventListener('click', onClose);
  }

  set total(value: number) {
    this.setText(this.description, `Списано ${value} синапсов`);
  }
}