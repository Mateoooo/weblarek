import { Component } from '../base/Component';
import { IEvents } from '../base/Events';

export class Gallery extends Component<HTMLElement[]> {
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
  }

  render(items: HTMLElement[]): HTMLElement {
    this.container.innerHTML = '';
    items.forEach(item => this.container.appendChild(item));
    return this.container;
  }
}