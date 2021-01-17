# Алгоритмы и структуры данных <a name='home'></a> 

+ [Время выполнения](#O-big)
### Поиск
+ [Бинарный поиск](#binary)
### Сортировка
+ [Пузырьковая сортировка](#bubble-sort)
+ [Сортировка вставками](#insertion-sort)

[^ Вверх](#home)
# Время выполнения <a name='O-big'></a>
О-большое описывает худший возможный млучай выполнения алгоритма.
<img alt="Возможные О" src="./images/O.jpg" />
Скорость алгоритма определяется темпом роста количества операций с увеличением данных.   
Формула описывает на сколько быстро возрастает врермя выполнения алгоритма с увеличение входных данных. 


[^ Вверх](#home)
# Бинарный поиск <a name='binary'></a>
**Время выполнения:** O(log n)  
Поиск выполняется на упорядоченном наборе данных. Определяется середина диапазона и сравнивается с искомым значением. 
Если искомое значение больше значения середины диапазона, то поиск производится в левой части диапазона, если меньше, 
то в правой части диапазона. Поиск происходит до тех пор, пока в поднаборе не останется ни одного элемента.

Пример, бинарный поиск для массивов JS:
```javascript
function findIndex(arr, elem) {
	return function isFind(arr, elem, start, end) {	
		if (start == end) return arr[end] == elem;
		var index = start + Math.floor((end - start)/2);
			
	 	if (arr[index] == elem) return true;
		if (arr[index] > elem) {
	       	return isFind(arr, elem, 0, index);
	    } else {
	        return isFind(arr, elem, index, end); 
	    }
	}(arr, elem, 0, arr.length);
} 

console.log('find ([1, 2, 3, 58] : ', findIndex([1, 2, 3, 58], 58));
console.log('find ([1, 2, 3, 58 , 66, 67, 72] : ', findIndex([1, 2, 3, 58 , 66, 67, 72], 58));
console.log('find ([1, 2, 3, 58 , 67, 72] : ', findIndex([1, 2, 3, 58 , 66, 67], 58));
console.log('find ([58 , 66, 67, 72] : ', findIndex([58 , 66, 67, 72], 58));
console.log('find ([58 , 66, 67, 72] : ', findIndex([59 , 66, 67, 72], 58));
```
Пример, бинарный поиск для строк (сначала упорядочивается строка) JS:   
```javascript
function findIndex(arr, elem) {
	return function isFind(arr, elem, start, end) {	
		if (start == end - 1) return arr[end] == elem;
		var index = start + Math.floor((end - start)/2);
			
		if (arr[index] == elem) return true;
		if (arr[index] > elem) {
			return isFind(arr, elem, 0, index);
		} else {
			return isFind(arr, elem, index, end); 
		}
	}(arr.split('').sort(), elem, 0, arr.length);
} 

console.log('asdabjkbjkkf : ', findIndex('asdabjkbjkkf', 'k')); //true
console.log('vxcvv : ', findIndex('vxcvv', 'x')); //true
console.log('rtyrygg : ', findIndex('rtyrygg', 'o')); //false
console.log('qweqewqeqw : ', findIndex('qweqewqeqw', 'q')); //true
console.log('xcvbnmmt : ', findIndex('xcvbnmmt', 't')); //true
```

[^ Вверх](#home)
# Пузырьковая сортировка <a name='bubble-sort'></a>
**Время выполнения (худшее):** O(n^2)    
**Время выполнения (лучшее):** O(n)    
Проход по массиву слева направо. Если текущий элемент больше следующего, то меняются элементы местами.

```javascript
const bubbleSort = ( arr ) => {
    let sorted = false;
    let count = 0;

    while (!sorted) {
        sorted = true;
        count++;

        for (let i = 0; i < arr.length; i++ ) {
            if ( arr[i] > arr[i + 1] ) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                sorted = false;
            }
        }

        console.log(JSON.stringify(arr));
    }

    console.log('Count of operations: ', count);
    return arr;
};

console.log(bubbleSort([7, 5, 9, 11, 3, 2, 8]));
// [5,7,9,3,2,8,11]
// [5,7,3,2,8,9,11]
// [5,3,2,7,8,9,11]
// [3,2,5,7,8,9,11]
// [2,3,5,7,8,9,11]
// [2,3,5,7,8,9,11]
// Count of operations: 6
// [2, 3, 5, 7, 8, 9, 11]
```

[^ Вверх](#home)
# Сортировка вставками <a name='insertion-sort'></a>
**Время выполнения (худшее):** O(n^2) 
**Время выполнения (лучшее):** O(n) 
При сортировке вставками массив постепенно перебирается слева направо. При этом каждый последующий элемент размещается так, чтобы он оказался между ближайшими элементами с минимальным и максимальным значением.

Например, если элемент больше предыдущего, то поменять элементы местами и делать такие перестановки, пока левый элемент не будет меньше. 

```javascript
const insertionSort = ( arr ) => {
    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];
        let j = i;

        while (j > 0 && arr[j - 1] > current) {
            arr[j] = arr[j - 1];
            j--;
        }

        arr[j] = current;
        console.log('current: ', current);
        console.log(JSON.stringify(arr));
    }

    return arr;
}

console.log(insertionSort([7, 5, 9, 11, 3, 2, 8]));
// current: 7
// [7,5,9,11,3,2,8]
// current: 5
// [5,7,9,11,3,2,8]
// current: 9
// [5,7,9,11,3,2,8]
// current: 11
// [5,7,9,11,3,2,8]
// current: 3
// [3,5,7,9,11,2,8]
// current: 2
// [2,3,5,7,9,11,8]
// current: 8
// [2,3,5,7,8,9,11]
// [2, 3, 5, 7, 8, 9, 11]
```