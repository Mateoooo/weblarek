import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Modal extends Component<unknown> {
  protected closeButton: HTMLButtonElement;
  protected contentContainer: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
    this.contentContainer = ensureElement<HTMLElement>('.modal__content', container);
    
    this.closeButton.addEventListener('click', () => this.close());
    this.container.addEventListener('click', () => this.close());
    this.contentContainer.addEventListener('click', (e) => e.stopPropagation());
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  close() {
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal:close');
  }

  set content(value: HTMLElement | null) {
    this.contentContainer.innerHTML = '';
    if (value) {
      this.contentContainer.appendChild(value);
    }
  }
}