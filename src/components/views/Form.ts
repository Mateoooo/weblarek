import { Component } from '../base/Component';
import { IEvents } from '../base/Events';
import { ensureElement } from '../../utils/utils';

export abstract class Form<T> extends Component<T> {
  protected submitButton: HTMLButtonElement;
  protected errorsElement: HTMLElement;
  
  public get formContainer(): HTMLFormElement {
    return this.container as HTMLFormElement;
  }

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container);
    
    this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);
    this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);
    
    this.container.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement;
      const field = target.name;
      const value = target.value;
      
      this.events.emit(`${this.container.name}.${field}:change`, { field, value });
    });
    
    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      this.events.emit(`${this.container.name}:submit`);
    });
  }

  toggleClass(element: HTMLElement, className: string, force?: boolean) {
    element.classList.toggle(className, force);
  }

  set errors(value: string) {
    this.setText(this.errorsElement, value);
  }

  set valid(value: boolean) {
    if (this.submitButton) {
      if (value) {
        this.submitButton.removeAttribute('disabled');
      } else {
        this.submitButton.setAttribute('disabled', 'disabled');
      }
    }
  }

  get valid(): boolean {
    return !this.submitButton.hasAttribute('disabled');
  }

  render(data?: Partial<T> & { valid?: boolean; errors?: string }): HTMLElement {
    if (data?.errors !== undefined)
         this.errors = data.errors;

    if (data?.valid !== undefined)
         this.valid = data.valid;
    
    if (data) {
      const { valid, errors, ...inputs } = data;
      super.render(inputs as Partial<T>); 
    }
    
    return this.container;
  }
}