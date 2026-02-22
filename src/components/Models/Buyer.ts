import { IBuyer, TPayment, ValidationResult } from '../../types';
import { IEvents } from '../base/Events';

export class Buyer {
  private payment: TPayment = '';
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  constructor(protected events: IEvents, initialData: Partial<IBuyer> = {}) {
    if (initialData.payment !== undefined) {
      this.payment = initialData.payment;
    }
    if (initialData.email !== undefined) {
      this.email = initialData.email;
    }
    if (initialData.phone !== undefined) {
      this.phone = initialData.phone;
    }
    if (initialData.address !== undefined) {
      this.address = initialData.address;
    }
  }

  setData(data: Partial<IBuyer>): void {
    let changed = false;
    
    if (data.payment !== undefined && data.payment !== this.payment) {
      this.payment = data.payment;
      changed = true;
    }
    if (data.email !== undefined && data.email !== this.email) {
      this.email = data.email;
      changed = true;
    }
    if (data.phone !== undefined && data.phone !== this.phone) {
      this.phone = data.phone;
      changed = true;
    }
    if (data.address !== undefined && data.address !== this.address) {
      this.address = data.address;
      changed = true;
    }
    
    if (changed) {
      this.events.emit('buyer:changed', this.getData());
      this.events.emit('formErrors:change', this.validate()); 
    }
  }

  setPayment(payment: TPayment): void {
    if (payment !== this.payment) {
      this.payment = payment;
      this.events.emit('buyer:changed', this.getData());
      this.events.emit('formErrors:change', this.validate()); 
    }
  }

  setEmail(email: string): void {
    if (email !== this.email) {
      this.email = email;
      this.events.emit('buyer:changed', this.getData());
      this.events.emit('formErrors:change', this.validate()); 
    }
  }

  setPhone(phone: string): void {
    if (phone !== this.phone) {
      this.phone = phone;
      this.events.emit('buyer:changed', this.getData());
      this.events.emit('formErrors:change', this.validate()); 
    }
  }

  setAddress(address: string): void {
    if (address !== this.address) {
      this.address = address;
      this.events.emit('buyer:changed', this.getData());
      this.events.emit('formErrors:change', this.validate()); 
    }
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address
    };
  }

  clear(): void {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
    this.events.emit('buyer:changed', this.getData());
    this.events.emit('formErrors:change', this.validate()); 
  }

  validate(): ValidationResult {
    const errors: ValidationResult = {};
    
    const paymentError = this.validatePayment();
    if (paymentError) errors.payment = paymentError;
    
    const emailError = this.validateEmail();
    if (emailError) errors.email = emailError;
    
    const phoneError = this.validatePhone();
    if (phoneError) errors.phone = phoneError;
    
    const addressError = this.validateAddress();
    if (addressError) errors.address = addressError;

    return errors;
  }

  validatePayment(): string | null {
    if (!this.payment) {
      return 'Не выбран способ оплаты';
    }
    return null;
  }

  validateEmail(): string | null {
    if (!this.email.trim()) {
      return 'Укажите email';
    }
    return null;
  }

  validatePhone(): string | null {
    if (!this.phone.trim()) {
      return 'Укажите телефон';
    }
    return null;
  }

  validateAddress(): string | null {
    if (!this.address.trim()) {
      return 'Укажите адрес';
    }
    return null;
  }
}