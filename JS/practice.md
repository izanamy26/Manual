```
 1  
| \  
2  3  
|   \  
4    5
```
Может возникнуть ситуация что у 1 родитель будет 4.

class Category {
    private int id;
    private Category parent;    
}

//ГОТОВ - метод который получает детей первого уровня
//1 - 2, 3
//2 - 4
List<Category> getChilds(Category category) { … }


//РЕАЛИЗОВАТЬ - метод для получения всех детей
//1 - 2, 3, 4, 5 порядок не важен
<details>
<summary>Решение</summary>

```javascript
List<Category> getAllChilds(Category category) {
    //ToDo 
    const children = [];
    
    return (function getChildren(cat)
 {
        const newChildren = this.getChilds(cat);
        
        if ( newChildren ) {
            for (let i = 0; i < newChildren.length; i++){
                const child = newChildren[i];
              
                if ( children.includes(child) ) {
                    return children;
                } else {
                    children.push(child);
                    return getChildren(child);
                }
        }      
      
      return children;      
    })(category);    
}
```
</details>
<hr />
// Сжатие целочисленного массива  

// ([3, 2, 1, 5, 6, -1, 10]) => "-1,1-3,5-6,10"
<details>
<summary>Решение</summary>

```javascript
    const compressArr = (arr) => {
		arr.sort((a, b) => a - b);

		let start = 0;
		const compArr = [];
    
		for (let i = 1; i < arr.length; i++ ) {
			if (arr[i] - arr[start] !== (i - start) * 1) {
				if ( i - start > 1 ) { //если между позициями больше 1
					compArr.push(`${arr[start]}-${arr[i - 1]}`);
				} else {
          		    compArr.push(arr[start]);
                }
          
				start = i;
			} 

            // для последних эементов массива
			if ( i === arr.length - 1 && start !== i ) {
				compArr.push(`${arr[start]}-${arr[i]}`);
			} else if (start === arr.length - 1) {
                compArr.push(arr[start]);
            }
		}

		return compArr.join(',');
}

console.log(compressArr([3, 2, 1, 5, 6, -1, 10, 11]));
// "-1,1-3,5-6,10-11"
```
</details>
<hr />
Проверка на полиндром. 
<details>
<summary>Решение</summary>
Нормализуем строку: убираем все символы, кроме букв и цифр, приводим к нижнему регистру. Далее, чтобы проверить переворачиваем строку: делим на массив букв, разворачиваем, превращаем в строку. Сравниваем перевернутую строку с нормальзированной.

```javascript
const isPolindrom = (str) => {
	const normalStr = str.replace(/[^A-Za-zА-Яа-яЁё0-9]*/g,'').toLowerCase();
	return normalStr.split('').reverse().join('') == normalStr;
}

console.log(isPolindrom("Ш4л4ш")); // true
console.log(isPolindrom("Eva, can I see bees in a cave?")); // true
console.log(isPolindrom("Привет")); // false
```
</details>
<hr />
// Аналог .join, использование метода Array.join() разрешено

// ('!', 1, 0, 5, -11) => "1!0!5!-11"
<details>
<summary>Решение</summary>

```javascript
const join = (dl, ...simbols) => {
	return simbols.join(dl);
}

console.log(join('!', 1, 0, 5, -11)); // "1!0!5!-11"
```
</details>
<hr />
// Сумма чисел массива

// ([1, 2, '3x']) => 6  
// ([1, 2, 'x3']) => 3  
// ([1, [1, 2], 2]) => 6

<details>
<summary>Решение</summary>

```javascript
function sumElementsOfArray (arr) {
	return arr.reduce((sum, item) => {
		if (Array.isArray(item)) {
			sum += sumElementsOfArray(item);  // рекурсия для вложенных массивов
		} else {
			const current = Number.parseInt(item); // возвращает NaN, если строка начинается не с числа
			sum += isFinite(current) ? current : 0;	
		}
        
        return sum;
	}, 0);
}

 console.log(sumElementsOfArray([1, 2, '3x'])); // 6
 console.log(sumElementsOfArray([1, 2, 'x3'])); // 3
 console.log(sumElementsOfArray([1, [1, 2, [3, 4]], 2])); // 13
```
</details>
<hr />
// Проверка массива на монотонность

// ([0, 1, 5, 9, 15]) => true  
// ([0, 1, 1, 5, 9, 9, 15]) => true   
// ([15, 8, 4, 2, 1]) => true  
// ([0, 1, 5, 15, 4]) => false  
<details>
<summary>Решение</summary>

Сортируем массив в необходимом порядке, затем сравниваем сериализованные массивы.
```javascript
const isMono = (arr) => {
	const srlArr = JSON.stringify(arr);
	const sortedArr = JSON.parse(srlArr)
    	.sort( arr[0] >= arr[arr.length - 1] 
        	? (a, b) => b - a 
            : (a, b) => a - b
            );
	return srlArr === JSON.stringify(sortedArr);
}

console.log(isMono([0, 1, 5, 9, 15])); // true
console.log(isMono([0, 1, 1, 5, 9, 9, 15])); // true
console.log(isMono([15, 8, 4, 2, 1])); // true
console.log(isMono([0, 1, 5, 15, 4])); // false
```
</details>
<hr />
// Сжатие строки

// ('AAABbbbBcCCC') => 'A3Bb3BcC3
<details>
<summary>Решение</summary>

```javascript
const compressStr = (str) => {
		let count = 1;
		const temp = [];

		for (let i = 0; i < str.length; i++) {
    	if ( str[i] === str[i + 1] ) {
      		count++;
      } else {
      		temp.push(str[i] + ( count > 1 ? count : ''));
          count = 1;
      }
    }
    
    return temp.join('');
}

console.log(compressStr('AAABbbbBcCCC')); // A3Bb3BcC3
```
</details>
<hr />
Написать функцию getPrimes(n) // Должна вернуть простые числа от 2 до n.
<details>
<summary>Решение</summary>

```javasscript
//O(n^2)
const getPrimes = (n) => {
	const primes = [];
    
	for (let i = 2; i < n; i++) {      
    	var isPrime = true;
        
    	for (let j = 2; j < i; j++) {
    		if ( i % j === 0 ) {
            	isPrime = false;
				break;
            }		    
        }
        
        if ( isPrime ) {
        	primes.push(i);
        }
    }

	return primes;
}

console.log(getPrimes(20)); // 2, 3, 5, 7, 11, 13, 17, 19
```
</details>
<hr />
Написать функцию, проверяющую правильно расставленные скобки;

<details>
<summary>Решение</summary>

```javascript
// Создаем стек из открытых скобок, т.е. идет по строке, смотрим, если открытая скобка, кладем во вспомогательный массив, если скобка не открытая, то она должна быть закрывающей скобкой из пары последней открывающейся скобки.
const check = (str) => {
	const strArr = str.split('');
	const bracket = {
    	'{': '}',
      	'(': ')',
      	'[': ']'
    };

	const opened = Object.keys(bracket);
    const tempArr = [];
    
    for ( let i = 0; i < strArr.length; i++ ) {
    	if ( opened.indexOf(strArr[i]) !== -1 ) {
        	tempArr.push(strArr[i]);
        } else if ( strArr[i] !== bracket[tempArr.pop()] ) { 
        	return false;
        }
    }

    return true;
}

console.log(check("{()}[]")); // true
console.log(check("{[}]")); // false
```
</details>
<hr />
Написать функции sum чтобы выражение sum(1)(2)(5)(10) и sum(1)(2)(5)(10)() возвращали 18.

<details>
<summary>Решение</summary>

```javascript
// console.log(sum(1)(2)(5)(10)());
function sum(a) {
		return function(b) {
    		return b ? sum(a + b) : a;
    }
}

// console.log(sum(1)(2)(5)(10));
function sum(a) {
	let summary = a;
    
	function func(b) {
    	summary +=b;
    	return func;
    }
    
    func.toString = function() {
    	return summary;
    };
    
    return func;
}

console.log( '' + sum(1)(2)(5)(10)); // Console.log не вызывает valueOf или toString, поэтому полюсуем строку, чтобы сработал возврат суммы, иначе будет возвращаться функция
```
</details>
<hr />
Выдать деньги из банкомата максимальными купюрами, если выдать полную сумму невозможно, выбросить исключение. Возможные купюры:  [5000, 1000, 500, 100, 50].
<details>
<summary>Решение</summary>

```javascript
/* 	var moneyTypes = [5000, 1000, 500, 100, 50];
	function getMoney(amount) {
   	// нужно вернуть набор денег в следующем формате
   	// {
   	//   5000: 1,
   	//   1000: 2,
   	//   ....
   	//   50: 5
   	// }
   	// Или бросить исключение, если вернуть деньги невозможно
} */
	const moneyTypes = [5000, 1000, 500, 100, 50];
    const result = {};
  
  	for ( let i = 0; i < moneyTypes.length; i++ ) {
    	const rest = amount % moneyTypes[i];
                
        if ( rest >= 0 ) {
        	const count = (amount - rest) / moneyTypes[i];
            
            if ( count > 0 ) {
            	result[moneyTypes[i]] = count;
            	amount = rest;
            }
        } 
        
        if (amount == 0) {
        	break;
        }
    }
    
    if ( amount > 0 ) {
    	throw new Error('Невозможно выдать данную сумму');
    }
    
    return result;
}

console.log(getMoney(13550)); // { 1000: 3, 50: 1, 500: 1, 5000: 2 }
console.log(getMoney(13575)); // Uncaught Error: Невозможно выдать данную сумму"


/* 	var limits = {
		5000: 4,
		1000: 5,
		500: 2,
		100: 5,
		50: 100
	};
	function getMoney(amount, limits) {
   // нужно вернуть набор денег и обновленные лимиты
   // {
   //   res: {
   //     5000: 1,
   //     1000: 2,
   //     ....
   //     50: 5
   //   } || "warn" (если вернуть деньги невозможно)
   //  limits: // объект лимитов той же структуры с обновленными    данными
   // }
	} */

	const getMoney = (amount, limits) => {
    const result = {};
	const moneyTypes = Object.keys(limits).sort((a, b) => Number(b) - Number(a));
    
    for ( let i = 0; i < moneyTypes.length; i++ ) {
    	const rest = amount % moneyTypes[i];
        const count = (amount - rest) / moneyTypes[i];
        
        if ( count > 0 ) {
        	if ( count >= limits[moneyTypes[i]] ) {
            	result[moneyTypes[i]] = limits[moneyTypes[i]];
                amount -= limits[moneyTypes[i]] * moneyTypes[i]; 
            } else {
          		result[moneyTypes[i]] = count;
                amount -= moneyTypes[i] * count;
            }    
        }
        
        if ( amount === 0 ) {
        	break;
        }
    }
    
    if ( amount > 0 ) {
    	throw new Error('Невозможно выдать данную сумму');
    }

    return result;
}

const limits = {
  5000: 4,
  1000: 5,
  500: 2,
  100: 5,
  50: 100
};

console.log(getMoney(28550, limits));  // { 100: 5, 1000: 5, 50: 41, 500: 2, 5000: 4 }
console.log(getMoney(13575, limits));  // Uncaught Error: Невозможно выдать данную сумму"
```
</details>
<hr />
Реализовать функции five, add, one, seven, subtract, two, чтобы работало:  

five(add(one())) // 6  
seven(subtract(two())) // 5

<details>
<summary>Решение</summary>

```javascript
fconst setNumber = (callback, num) => callback ? callback(num) : num;
const one = callback => setNumber(callback, 1);
const two = callback => setNumber(callback, 2);
const five = callback => setNumber(callback, 5);
const seven = callback => setNumber(callback, 7);

function add(a) {
    return function(b) {
    	return a + b;
    }
}

function substract(a) {
	return function(b) {
    	return b - a;
    }
}

console.log(five(add(one()))); //6
console.log(seven(substract(two()))); //5
```
</details>
<hr />
Написать функцию myNew, чтобы она работала как конструктор, но без вызова new.  

<details>
<summary>Решение</summary>

```javascript
function Person(name, age) {
  	this.name = name;
  	this.age = age;
}

// Если конструктор явно не возвращает объект, то он возвращает this, значит создаем объект, у которого  прототип будет Person.
function myNew(construct, name, age) {
	return Object.create(construct['prototype']);  
}

var person = myNew(Person, "Vasia", 34);
 
console.log(person instanceof Person ); 
```
</details>
<hr />
Найти сумму всех value.  

```
{
  value: 4,
  next: [
    {
      value: 3,
      next: [{
        		value: 2
        }
      ]
    },
    {
      value: 3,
      next: [{
      		value: 4,
          next: [ {
          		value: 5
          },
          {
          	value: 7
          }]
      }]
    }
  ]
}
```

<details>
<summary>Решение</summary>

```javascript
function getSumValues(o) {
		let sum = o.value;

		return (function getSum( obj ) {
    		
    		if ( obj.next ) {
    			for (let i = 0; i < obj.next.length; i++ ) {
            		sum += obj.next[i].value;
						
              	if ( obj.next[i].next ) {
                	sum = getSum(obj.next[i]);
                }
        				
        		}
    		} else {
         		sum += obj.value;
         		return sum;
        }
        
        return sum;
    })(o);
}


const obj = {
  value: 4,
  next: [
    {
      value: 3,
      next: [{
        		value: 2
        }
      ]
    },
    {
      value: 3,
      next: [{
      		value: 4,
          next: [ {
          		value: 5
          },
          {
          	value: 7
          }]
      }]
    }
  ]
}

console.log(getSumValues(obj));
```
</details>
<hr />
Необходимо написать функцию создающую пространство имен.
На вход подается строка вида: "a.b.c.d.e", 
на выходе ожидаем получить вложенные друг в друга объекты.

<details>
<summary>Решение</summary>

```javascript
function namespace(str) {
    var names = str.split('.');
    var obj = {};
    
    for (var i = names.length - 1; i >= 0; i++) {
        var tempObj = {};
        tempObj[names[i]] = obj;
        obj = tempObj;          
    }
    
    return obj;
}

namespace('a.b.c.d.e') // "{"a":{"b":{"c":{"d":{"e":{}}}}}}"
```
</details>

<hr/>

Нужно сделать плоским словарь с вложенной структурой.
Во входном объекте значением может быть строка или словарь.
Ключ может быть пустой строкой. В этом случае его не нужно включать в название итогового ключа.
Пример 1
```
{
    "Key_1" : "1",
    "Key_2" : {
        "a" : "2",
        "b" : "3",
        "c" : {
            "x" : "4",
            "z" : {
                "" : "5"
            }
        }
    }
} => {
   "Key_1" : "1",
   "Key_2.a" : "2",
   "Key_2.b" : "3",
   "Key_2.c.x" : "4",
   "Key_2.c.z" : "5"
}

Пример 2
{
    "": {
        "a":"1"
    },
    "b": "3"
} =>
{
    "a":"1",
    "b":"3"
}
*/
```
<details>
<summary>Решение</summary>

```javascript
function getDict(obj) {
    const dict = {};
    const key = '';
    
    (function getValues( obj , key) {
        const keys = Object.keys(obj);
    
        for ( let i = 0; i < keys.length; i++) {
            const tempKey =  key ? (keys[i] ? `${key}.${keys[i]}` : key) : keys[i];
            
            if ( typeof(obj[keys[i]]) === 'object' ) {
                Object.assign(dict, getValues(obj[keys[i]], tempKey));
            } else {
                dict[tempKey] = obj[keys[i]];
            }
        }  
        return dict;
    })(obj, key);
    
    return dict;
}
```
</details>
<hr />
Реализовать генератор цвета в hex-системе.

<hr />
Сверить две строки так, что буквы из первой строки в том же порядке встчаются во второй строке.  
isConstituent('weght', 'aswfreghklto'); // true
isConstituent('weght', 'ashwfregklto'); // false

<hr />