# Бинарный поиск

Поиск выполняется на упорядоченном наборе данных. Определяется середина диапазона и сравнивается с искомым значением. 
Если искомое значение больше значения середины диапазона, то поиск производится в левой части диапазона, если меньше, 
то в правой части диапазона. Поиск происходит до тех пор, пока в поднаборе не останется ни одного элемента.

Пример, бинарный поиск для массивов JS:

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

Пример, бинарный поиск для строк (сначала упорядочивается строка) JS:
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
