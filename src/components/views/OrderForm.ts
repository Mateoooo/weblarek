import { Form } from './Form';
import { IEvents } from '../base/Events';
import { ensureAllElements } from '../../utils/utils';
import { IOrderForm } from '../../types';

export class OrderForm extends Form<IOrderForm> {
  protected buttons: HTMLButtonElement[];

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);

    this.buttons = ensureAllElements<HTMLButtonElement>('.button_alt', container);

    this.buttons.forEach(button => {
      button.addEventListener('click', () => {
        this.payment = button.name;
        events.emit('payment:change', { payment: button.name });
      });
    });
  }

  set payment(name: string) {
    this.buttons.forEach(button => {
      this.toggleClass(button, 'button_alt-active', button.name === name);
    });
  }

  get payment(): string {
    const activeButton = this.buttons.find(button => 
      button.classList.contains('button_alt-active')
    );
    return activeButton?.name || '';
  }

  set address(value: string) {
    const input = this.container.elements.namedItem('address') as HTMLInputElement;
    if (input)
         input.value = value;
  }

  get address(): string {
    const input = this.container.elements.namedItem('address') as HTMLInputElement;
    return input?.value || '';
  }
}