import { Form } from './Form';
import { IEvents } from '../base/Events';
import { IOrderForm } from '../../types';

export class ContactsForm extends Form<IOrderForm> {
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  }

  set phone(value: string) { 
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value; 
  } 

  set email(value: string) { 
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value; 
  } 
}