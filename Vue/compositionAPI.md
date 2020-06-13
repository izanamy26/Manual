# Vue <a name='home'></a> 

* [setup](#setup)
* [reactive](#reactive)
* [ref](#ref)
* [computed](#computed)
* [readonly](#readonly)
* [watchEffect](#watchEffect)
* [watch](#watch)

* [Хуки жизненного цикла](#hooks)
* [Dependency Injection](#di)
* [Ссылка на шаблон](#template)

* [unref](#unref)
* [toRef](#toRef)

[^ Вверх](#home) 
## setup <a name='setup'></a>
Служит входной точкой для api. Вызывается перед хуком ```beforeCreated```. Так же функция ```setup``` может возвращать рендер-функцию. ```this``` недоступен.
**Аргументы:**  
* ```props``` - при передаче объект пропсов нельзя деструктурировать, потому как свойства теряют реактивность;  
* ```context```- объект контекста, предоставляет некоторые свойства Vue 2.x. (например, context.attrs, context.slots, context.emit), объект можно деструктурировать;

```javascript
setup(props, { attrs, slot, emit }) {}
```

**TypeScript**
```javascript
interface Data {
  [key: string]: unknown
}

interface SetupContext {
  attrs: Data
  slots: Slots
  emit: (event: string, ...args: unknown[]) => void
}

function setup(props: Data, context: SetupContext): Data
```


[^ Вверх](#home) 
## reactive <a name='reactive'></a>
Возвращает реактивный объект. Реактивное преобразование объекта является глубоким.
```javascript
const obj = reactive({ count: 0 })
```
**TypeScript**
```javascript
function reactive<T extends object>(raw: T): T
```


[^ Вверх](#home) 
## ref <a name='ref'></a>
Возвращает реактивный изменяемый объект. Имеет единственное свойство ```.value```, в шаблоне это свойство использовать не надо, оно распаковывается автоматически, так же если является свойством реактивного объекта.  
**TypeScript**  
```javascript
interface Ref<T> {
  value: T
}

function ref<T>(value: T): Ref<T>

const foo = ref<string | number>('foo') // foo's type: Ref<string | number>
foo.value = 123 // ok!
``` 


[^ Вверх](#home) 
## computed <a name='computed'></a>
Вычисляемое свойство.  
**TypeScript**
```javascript
function computed<T>(getter: () => T): Readonly<Ref<Readonly<T>>>

// writable
function computed<T>(options: {
  get: () => T
  set: (value: T) => void
}): Ref<T>
```



[^ Вверх](#home) 
## readonly <a name='readonly'></a>
Делает объект неизменяемым.
```javascript
const copy = readonly(original);
```


## watchEffect <a name='watchEffect'></a>

## watch <a name='watch'></a>



## Хуки жизненного цикла <a name='hooks'></a>
Вместо *beforeCreated*, *created* необходимо использовать ```setup()```.  
* beforeMount -> ```onBeforeMount```  
* mounted -> ```onMounted```  
* beforeUpdate -> ```onBeforeUpdate```  
* updated -> ```onUpdated```  
* beforeDestroy -> ```onBeforeUnmount```  
* destroyed -> ```onUnmounted```  
* errorCaptured -> ```onErrorCaptured```
* ```onRenderTracked```  
* ```onRenderTriggered```



## Dependency Injection <a name='di'></a>
Аналог ```provide/inject```, ```inject``` принимает необязательное значение по умолчанию в качестве второго аргумента.



## Ссылка на шаблон <a name='template'></a>
```html
<div ref="root"></div>
```
```javascript
const root = ref(null); // root.value = <div></div>
```

## unref <a name='unref'></a>
Возвращает внутреннее значение, если аргумент является ссылкой, иначе возвращает сам аргумент. Это функция сахара для ```val = isRef(val) ? val.value : val```.



## toRef <a name='toRef'></a>
Создание ссылки на свойство исходного реактивного объекта.