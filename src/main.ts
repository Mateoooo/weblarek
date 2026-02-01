import './scss/styles.scss';
import { ProductList } from './components/base/Models/ProductList';
import { Cart } from './components/base/Models/Cart';
import { Buyer } from './components/base/Models/Buyer';
import { IProduct } from './types';
import { WebLarekAPI } from './components/base/WebLarekAPI';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';

console.log('Тестирование моделей данных...\n');

// Тест ProductList
const productsData: IProduct[] = apiProducts.items;
console.log('1. Тестируем каталог товаров - ProductList:');

const catalog = new ProductList();
console.log('- Создан пустой каталог');

catalog.setItems(productsData);
console.log('- В каталог добавлено товаров:', productsData.length);

const allProducts = catalog.getItems();
console.log('- Получены все товары из каталога:');
allProducts.forEach((product, index) => {
  const priceInfo = product.price ? `${product.price} руб.` : 'цена не указана';
  console.log(`  ${index + 1}. ${product.title} - ${priceInfo} (${product.category})`);
});

const foundProductId = 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9';
const foundProduct = catalog.getItem(foundProductId);
console.log(`- Поиск товара с ID "${foundProductId}":`, 
  foundProduct ? `${foundProduct.title} найден` : 'не найден');

const notFoundProductId = '777';
const notFoundProduct = catalog.getItem(notFoundProductId);
console.log(`- Поиск товара с ID "${notFoundProductId}":`, 
  notFoundProduct ? 'найден' : 'не найден');

if (foundProduct) {
  catalog.setPreviewItem(foundProduct);
  console.log(`- Установлен товар для просмотра: "${foundProduct.title}"`);
  console.log('- Получен товар для просмотра:', catalog.getPreviewItem()?.title);
}

// Тест Cart 
console.log('\n2. Тестируем корзину - Cart:');

const cart = new Cart();
console.log('- Создана пустая корзина');

const cartItemsToAdd = productsData.filter(item => item.price !== null);
cartItemsToAdd.forEach(item => cart.addItem(item));
console.log(`- Добавлено товаров в корзину: ${cartItemsToAdd.length} (все за исключением бесценных)`);

const cartItems = cart.getItems();
console.log('- Товары в корзине:');
cartItems.forEach((item, index) => {
  console.log(`  ${index + 1}. ${item.title} - ${item.price} руб.`);
});

console.log('- Количество товаров в корзине:', cart.getItemsCount());
console.log('- Общая стоимость корзины:', cart.getTotalAmount(), 'руб.');

const hexLollipopId = 'c101ab44-ed99-4a54-990d-47aa2bb4e7d9';
console.log(`- Проверка наличия товара с ID "${hexLollipopId}":`, 
  cart.contains(hexLollipopId) ? 'есть' : 'нет');

const nonExistentId = '333';
console.log(`- Проверка наличия товара с ID "${nonExistentId}":`, 
  cart.contains(nonExistentId) ? 'есть' : 'нет');

if (foundProduct) {
  cart.removeItem(foundProduct);
  console.log(`- Удален товар "${foundProduct.title}"`);
  console.log('- Количество товаров после удаления:', cart.getItemsCount());
  console.log('- Общая стоимость после удаления:', cart.getTotalAmount(), 'руб.');
}

cart.clear();
console.log('- Корзина очищена');
console.log('- Количество товаров после очистки:', cart.getItemsCount());

// Тест Buyer 
console.log('\n3. Тестируем покупателя - Buyer:');

const buyer = new Buyer({
  email: 'customer@example.com',
  phone: '+79891231237'
});
console.log('- Создан покупатель с email и телефоном');

// Получаем данные (должен быть null, так как не все поля заполнены)
console.log('- Полные данные покупателя (частично заполнен):', buyer.getData());

// Добавляем остальные данные
buyer.setPayment('online');
buyer.setAddress('г. Москва, ул. Абракадабра, д. 11, кв. 22');
console.log('- Добавлены способ оплаты и адрес');

// Получаем полные данные
const fullData = buyer.getData();
console.log('- Полные данные покупателя:');
if (fullData) {
  console.log('  Способ оплаты:', fullData.payment);
  console.log('  Email:', fullData.email);
  console.log('  Телефон:', fullData.phone);
  console.log('  Адрес:', fullData.address);
}

// Проверяем валидацию отдельных полей
console.log('- Проверка валидации полей:');
console.log('  Способ оплаты:', buyer.validatePayment() || 'OK');
console.log('  Email:', buyer.validateEmail() || 'OK');
console.log('  Телефон:', buyer.validatePhone() || 'OK');
console.log('  Адрес:', buyer.validateAddress() || 'OK');

// Проверяем полную валидацию
const validationResult = buyer.validate();
console.log('- Результат полной валидации:');
if (Object.keys(validationResult).length === 0) {
  console.log('  Все поля валидны');
} else {
  console.log('  Найдены ошибки:', validationResult);
}

console.log('\n- Тестирование обновления данных:');
buyer.setData({ 
  email: 'new.email@example.com', 
  phone: '+79891115511' 
});
const updatedData = buyer.getData();
console.log('  Данные после обновления email и телефона:');
if (updatedData) {
  console.log('  Email:', updatedData.email);
  console.log('  Телефон:', updatedData.phone);
}

// Тестируем пошаговое обновление полей
console.log('\n- Тестирование пошагового заполнения данных покупателя:');
const stepBuyer = new Buyer();

stepBuyer.setEmail('qwerty@example.com');
console.log('  1. Установлен email');

stepBuyer.setPhone('+79991112233');
console.log('  2. Установлен телефон');

stepBuyer.setPayment('offline');
console.log('  3. Установлен способ оплаты: offline');

stepBuyer.setAddress('г. Санкт-Петербург, Невский пр. 11');
console.log('  4. Установлен адрес');

console.log('  Полные данные:', stepBuyer.getData());

// Создаем покупателя с невалидными данными
console.log('\n- Тестирование валидации с невалидными данными:');
const invalidBuyer = new Buyer({ 
  email: '', 
  phone: '  ', 
  address: ' ' 
});
const invalidValidation = invalidBuyer.validate();
console.log('  Результат валидации пустых полей:', invalidValidation);

// Очищаем данные
buyer.clear();
console.log('\n- Данные покупателя очищены');
console.log('- Данные после очистки:', buyer.getData());

// ----------------------------------------------------------------------------------- //

const api = new WebLarekAPI(API_URL);
console.log('- API клиент создан');

// Создаем модель для хранения товаров с сервера
const serverCatalog = new ProductList();
console.log('- Модель каталога для серверных данных создана');
console.log('- Кол-во товаров в каталоге:', serverCatalog.getItems().length);
console.log('- Отправляем GET запрос на:', API_URL + '/product');

// Выполняем запрос к серверу
api.getProductList()
.then(products => {
    
    console.log('\n Запрос успешен.');
    console.log('\n Сохраняем полученные товары в модель ProductList...');
    serverCatalog.setItems(products);
    
    // Проверяем количество товаров
    const savedProducts = serverCatalog.getItems();
    console.log('- Метод getItems() вернул:', savedProducts.length, 'товаров');
    console.log('- Совпадает с полученными с сервера:', savedProducts.length === products.length ? ' да' : ' нет');
    
     products.forEach((product, index) => {
      console.log(`\n Товар ${index + 1} из ${products.length}:`);
      console.log('-'.repeat(55));
      
      // Выводим все поля объекта
      console.log('  ID:', product.id);
      console.log('  Название:', product.title);
      console.log('  Категория:', product.category);
      console.log('  Цена:', product.price !== null ? `${product.price} руб.` : 'не указана (null)');
      console.log('  Описание:', product.description);
      console.log('  Изображение:', product.image);
      
    });
    
    if (savedProducts.length > 0) {
      const firstProduct = savedProducts[0];
      
      // Тестируем поиск по ID
      console.log('\n- Тестируем поиск товара по ID:');
      const foundProduct = serverCatalog.getItem(firstProduct.id);
      console.log('  Поиск товара с ID "' + firstProduct.id + '":', 
        foundProduct ? ' найден (' + foundProduct.title + ')' : ' не найден');
      
      // Тестируем preview
      console.log('\n- Тестируем работу с preview товаром:');
      serverCatalog.setPreviewItem(firstProduct);
      
      const preview = serverCatalog.getPreviewItem();
      console.log('  setPreviewItem() и getPreviewItem():', 
        preview?.id === firstProduct.id ? ' работает' : ' не работает');
    }
    
    console.log('- Всего товаров:', products.length);
    
    const withPrice = products.filter(p => p.price !== null).length;
    const withoutPrice = products.filter(p => p.price === null).length;
    console.log('- С ценой:', withPrice, 'товаров');
    console.log('- Без цены (или бесценны):', withoutPrice, 'товаров');
    
  })
  .catch(error => {
    console.log('\nОшибка при работе с api:', error.message); 
  });