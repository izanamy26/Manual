
# Jest <a name='home'></a>

* [Сопоставления](#mathes)
* [Тестирование асинхронного кода](#async)


# Сопоставления <a name='matches'></a>
**toBeNull** - соответствует только null;   
**toUndefined** - соответствует только undefined;  
**toBeDefined** - является противоположностью toBeUndefined;  
**toBeTruthy** - соответствует всему, что if инструкция рассматривает как true;  
**toBeFalsy** - соответствует всему, что if инструкция рассматривает как false;  


**toBeGreaterThan** - больше чем;  
**toBeGreaterThanOrEqual** - быть больше или равно;  
**toBeLessThan** - меньше, чем;
**toBeLessThanOrEqual** - меньше или равно;

**toBeCloseTo** - для чисел с плавающей запятой;  

**toMatch(/.../)** - для сопоставления строк с регулярными выражениями;  

**toContain** - содержит ли массив или иттерируемый объект конкретное значение;

**toThrow** - возвращает ли ошибку;

# Тестирование асинхронного кода  <a name='async'></a>
**Коллбеки:**  
```javascript
test('the data is peanut butter', done => { //jest будет ждать вызова done, и только потом тест завершится
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

**Промисы:** 
Использовать **return** обязательно (**return** fetchData...), иначе тест завершиться до разрешения промиса.
```javascript
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

```javascript
test('the fetch fails with an error', () => {
  expect.assertions(1); // проверяет, что была вызвана одна проверка
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

*.resolves / .rejects:*
```javascript
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```
```javascript
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```

**Async/Await:**  
Чтобы написать асинхронный тест, просто используйте **async** перед определением функции передаваемой в test.
```javascript
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

test('the data is peanut butter', async () => {
  await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  await expect(fetchData()).rejects.toThrow('error');
});
```