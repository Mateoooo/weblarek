import { IBuyer, TPayment, ValidationResult } from '../../../types';

export class Buyer {

  private _payment: TPayment | null = null;
  private _email: string = '';
  private _phone: string = '';
  private _address: string = '';

  constructor(initialData: Partial<IBuyer> = {}) {
    if (initialData.payment) {
      this._payment = initialData.payment;
    }
    if (initialData.email) {
      this._email = initialData.email;
    }
    if (initialData.phone) {
      this._phone = initialData.phone;
    }
    if (initialData.address) {
      this._address = initialData.address;
    }
  }

  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this._payment = data.payment;
    }
    if (data.email !== undefined) {
      this._email = data.email;
    }
    if (data.phone !== undefined) {
      this._phone = data.phone;
    }
    if (data.address !== undefined) {
      this._address = data.address;
    }
  }

  setPayment(payment: TPayment): void {
    this._payment = payment;
  }

  setEmail(email: string): void {
    this._email = email;
  }

  setPhone(phone: string): void {
    this._phone = phone;
  }

  setAddress(address: string): void {
    this._address = address;
  }

  getData(): IBuyer | null {
    if (this._payment && this._email && this._phone && this._address) {
      return {
        payment: this._payment,
        email: this._email,
        phone: this._phone,
        address: this._address
      };
    }
    return null;
  }

  clear(): void {
    this._payment = null;
    this._email = '';
    this._phone = '';
    this._address = '';
  }

  validate(): ValidationResult {
    const errors: ValidationResult = {};

    const paymentError = this.validatePayment();
    if (paymentError) {
      errors.payment = paymentError;
    }

    const emailError = this.validateEmail();
    if (emailError) {
      errors.email = emailError;
    }

    const phoneError = this.validatePhone();
    if (phoneError) {
      errors.phone = phoneError;
    }

    const addressError = this.validateAddress();
    if (addressError) {
      errors.address = addressError;
    }

    return errors;
  }

  validatePayment(): string | null {
    if (!this._payment) {
      return 'Не выбран способ оплаты';
    }
    return null;
  }

  validateEmail(): string | null {
    if (!this._email.trim()) {
      return 'Укажите email';
    }
    return null;
  }

  validatePhone(): string | null {
    if (!this._phone.trim()) {
      return 'Укажите телефон';
    }
    return null;
  }

  validateAddress(): string | null {
    if (!this._address.trim()) {
      return 'Укажите адрес';
    }
    return null;
  }
}