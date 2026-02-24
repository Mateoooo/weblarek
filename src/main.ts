import './scss/styles.scss';
import { EventEmitter } from './components/base/Events';
import { Api } from './components/base/Api';
import { cloneTemplate, ensureElement } from './utils/utils';

// Модели данных
import { ProductList } from './components/Models/ProductList';
import { Cart } from './components/Models/Cart';
import { Buyer } from './components/Models/Buyer';

// Компоненты представления
import { Header } from './components/views/Header';
import { CardCatalog } from './components/views/CardCatalog';
import { CardPreview } from './components/views/CardPreview';
import { CardBasket } from './components/views/CardBasket';
import { Gallery } from './components/views/Gallery';
import { Modal } from './components/views/Modal';
import { Basket } from './components/views/Basket';
import { OrderForm } from './components/views/OrderForm';
import { ContactsForm } from './components/views/ContactsForm';
import { Success } from './components/views/Success';

// API и константы
import { WebLarekAPI } from './components/WebLarekAPI';
import { API_URL, CDN_URL } from './utils/constants';
import { IOrder, ValidationResult } from './types';

// Создаем брокер событий
const events = new EventEmitter();

// Создаем модели данных
const catalogModel = new ProductList(events);
const cartModel = new Cart(events);
const buyerModel = new Buyer(events);

// Создаем API клиент
const baseApi = new Api(API_URL);
const api = new WebLarekAPI(baseApi);

// Получаем шаблоны из DOM
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Создаем компоненты представления
const header = new Header(events, ensureElement<HTMLElement>('.header'));
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basketComponent = new Basket(cloneTemplate<HTMLElement>(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate<HTMLFormElement>(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate<HTMLFormElement>(contactsTemplate), events);

const previewCard = new CardPreview(cloneTemplate<HTMLElement>(cardPreviewTemplate), events,
  () => {
    const product = catalogModel.getPreviewItem();
    if (!product || product.price === null) {
      return;
    }
    
    if (cartModel.contains(product.id)) {
      cartModel.removeItem(product);
    } else {
      cartModel.addItem(product);
    }
  }
);

// Загружаем товары с сервера
api.getProductList()
  .then(products => {
    catalogModel.setItems(products);
  })
  .catch(error => {
    console.error('Ошибка загрузки товаров:', error);
  });


// Рендеринг

function renderCatalog(): void {
  const products = catalogModel.getItems();
  
  const cards = products.map(item => {
    const card = new CardCatalog(
      cloneTemplate<HTMLElement>(cardCatalogTemplate),
      events,
      () => catalogModel.setPreviewItem(item)
    );
    
    return card.render({
      title: item.title,
      price: item.price,
      category: item.category,
      image: CDN_URL + item.image
    });
  });
  
  gallery.render(cards);
}

function updatePreviewButton(): void {
  const product = catalogModel.getPreviewItem();
  if (!product) {
    return;
  }

  const hasPrice = product.price !== null;;
  
  previewCard.buttonDisabled = !hasPrice;
  previewCard.buttonText = !hasPrice ? 'Недоступно' : (cartModel.contains(product.id) ? 'Удалить из корзины' : 'В корзину');
}

function renderBasket(): void {
  const items = cartModel.getItems();
  const total = cartModel.getTotalAmount();
  
  basketComponent.buttonDisabled = items.length === 0;
  basketComponent.total = total;
  
  if (items.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Корзина пуста';
    basketComponent.items = [emptyMessage];
  } else {
    let index = 1;
    const basketItems = items.map(item => {
      const card = new CardBasket(
        cloneTemplate<HTMLElement>(cardBasketTemplate),
        events,
        () => {
          cartModel.removeItem(item);
        }
      );
      
      card.render({
        title: item.title,
        price: item.price || 0,
        index: index++
      });
      
      return card.render();
    });
    basketComponent.items = basketItems;
  }
}

function renderOrderForm(): void {
  const buyerData = buyerModel.getData();
  
  orderForm.render({
    address: buyerData.address,
    payment: buyerData.payment || '',
    valid: false,
    errors: ''
  });
  
  modal.content = orderForm.formContainer;
  modal.open();
}

function renderContactsForm(): void {
  const buyerData = buyerModel.getData();
  
  contactsForm.render({
    email: buyerData.email,
    phone: buyerData.phone,
    valid: false,
    errors: ''
  });
  
  modal.content = contactsForm.formContainer;
  modal.open();
}

function renderSuccess(total: number): void {
  const success = new Success(
    cloneTemplate<HTMLElement>(successTemplate),
    () => {
      modal.close();
      cartModel.clear();
      buyerModel.clear();
      header.counter = 0;
    }
  );
  success.total = total;
  
  modal.content = success.render();
  modal.open();
}

// Обработчики событий   

// Изменение каталога товаров 
events.on('catalog:changed', renderCatalog);

// Изменение выбранного товара для просмотра 
events.on('preview:changed', () => {
  const product = catalogModel.getPreviewItem();
  if (!product) { 
    return;
  }

  previewCard.render({
    id: product.id,
    title: product.title,
    price: product.price,
    category: product.category,
    image: CDN_URL + product.image,
    description: product.description
  });
  
  updatePreviewButton();
  modal.content = previewCard.render();
  modal.open();
});

// Изменение содержимого корзины 
events.on('cart:changed', () => {
  header.counter = cartModel.getItemsCount();
  
  updatePreviewButton();
  renderBasket();
});

// Изменение данных покупателя
events.on('buyer:changed', () => {
  const buyerData = buyerModel.getData();

  orderForm.address = buyerData.address;
  orderForm.payment = buyerData.payment || ''; 
  
  contactsForm.email = buyerData.email;
  contactsForm.phone = buyerData.phone;
});

// Валидация 
events.on('formErrors:change', (errors: ValidationResult) => { 

  const { email, phone, address, payment } = errors; 

  orderForm.valid = !address && !payment; 
  orderForm.errors = [address, payment].filter(e => e).join('; '); 

  contactsForm.valid = !email && !phone; 
  contactsForm.errors = [email, phone].filter(e => e).join('; '); 
}); 

// Нажатие кнопки открытия корзины 
events.on('basket:open', () => {
  modal.content = basketComponent.render();
  modal.open();
});

// Нажатие кнопки оформления заказа 
events.on('basket:order', () => {
  if (cartModel.getItemsCount() > 0) {
    renderOrderForm();
  }
});

// Изменение поля в форме заказа 
events.on('order.address:change', (data: { value: string }) => {
  buyerModel.setAddress(data.value);
});

// Изменение поля в форме контактов 
events.on('contacts.email:change', (data: { value: string }) => {
  buyerModel.setEmail(data.value);
});

events.on('contacts.phone:change', (data: { value: string }) => {
  buyerModel.setPhone(data.value);
});

// Выбор способа оплаты 
events.on('payment:change', (data: { payment: string }) => {
  buyerModel.setPayment(data.payment as 'online' | 'offline');
});

// Отправка формы заказа 
events.on('order:submit', () => {
  const buyerData = buyerModel.getData();
  if (buyerData.payment && buyerData.address.trim()) {
    renderContactsForm();
  }
});

// Отправка формы контактов 
events.on('contacts:submit', () => {
  const buyerData = buyerModel.getData();
  const items = cartModel.getItems();
  
  const order: IOrder = {
    payment: buyerData.payment,
    email: buyerData.email,
    phone: buyerData.phone,
    address: buyerData.address,
    total: cartModel.getTotalAmount(),
    items: items.map(item => item.id)
  };
  
  api.submitOrder(order)
    .then(result => {
      renderSuccess(result.total);
    })
    .catch(error => {
      console.error('Ошибка при оформлении заказа:', error);
    });
});