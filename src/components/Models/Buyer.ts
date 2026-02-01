import { IBuyer, TPayment, ValidationResult } from '../../types';

export class Buyer {

  private payment: TPayment = '';  
  private email: string = '';
  private phone: string = '';
  private address: string = '';

  constructor(initialData: Partial<IBuyer> = {}) {
    if (initialData.payment) {
      this.payment = initialData.payment;
    }
    if (initialData.email) {
      this.email = initialData.email;
    }
    if (initialData.phone) {
      this.phone = initialData.phone;
    }
    if (initialData.address) {
      this.address = initialData.address;
    }
  }

  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }
    if (data.email !== undefined) {
      this.email = data.email;
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
    }
    if (data.address !== undefined) {
      this.address = data.address;
    }
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setAddress(address: string): void {
    this.address = address;
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
  }

  validate(): ValidationResult {
    const errors: ValidationResult = {};
    
    let error: string | null;
    
    error = this.validatePayment();
    if (error) {
      errors.payment = error;
    }
    
    error = this.validateEmail();
    if (error) {
       errors.email = error;
    }
    
    error = this.validatePhone();
    if (error) {
      errors.phone = error;
    }

    error = this.validateAddress();
    if (error) {
       errors.address = error;
    }

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