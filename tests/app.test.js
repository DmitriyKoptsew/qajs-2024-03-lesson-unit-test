import { fullTrim, getTotal, nameIsValid } from '../src/app.js'

describe('Test nameIsValid', () => {
  it('is function', () => {
    expect(typeof nameIsValid).toBe('function')
  })
  it('empty - false', () => {
    expect(nameIsValid('')).toBe(false)
  })
  it('Non empty - true', () => {
    expect(nameIsValid('lblkblsbdv')).toBe(true)
  })
  it('eng - true', () => {
    expect(nameIsValid('sdds')).toBe(true)
  })
  it('rus - false', () => {
    expect(nameIsValid('йцу')).toBe(false)
  })
  it('<2 symbol - false', () => {
    expect(nameIsValid('s')).toBe(false)
  })
})

describe('fullTrim function', () => {
  test.each([
    ['  qwerty  ', 'qwerty'], // Пробелы до и после текста
    ['q  we rty    ', 'qwerty'], // Пробелы внутри текста
    ['qwerty', 'qwerty'], // Без пробелов
    ['  qwe  rt  y  ', 'qwerty'], // Множественные пробелы
    ['q ', 'q'], // Один пробел
    ['', ''] // Пустая строка
  ])('removes spaces from "%s" and returns "%s"', (input, expected) => {
    expect(fullTrim(input)).toBe(expected);
  });
});

describe('Test getTotal', () => {
  it('total without discount', () => {
    const items = [
      { price: 10, quantity: 5 },
      { price: 20, quantity: 3 }
    ];
    const total = getTotal(items);
    expect(total).toBe(110); // Ожидаемый результат без скидки: (10 * 5) + (20 * 3) = 50 + 60 = 110
  });

  it('total with discount', () => {
    const items = [
      { price: 10, quantity: 5 },
      { price: 20, quantity: 3 }
    ];
    const discount = 10;
    const total = getTotal(items, discount);
    expect(total).toBe(99); // Ожидаемый результат с 10% скидкой: (10 * 5) + (20 * 3) = 50 + 60 = 110, 10% скидки от 110 = 11, 110 - 11 = 99
  });

  it('throws an error for negative discount', () => {
    const items = [{ price: 10, quantity: 5 }];
    const discount = -10;
    expect(() => getTotal(items, discount)).toThrow('Процент скидки не может быть отрицательным');
  });
});
