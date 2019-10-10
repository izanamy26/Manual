# Vue 
<a href="https://ru.vuejs.org/">https://ru.vuejs.org/</a>
***
* [Компоненты](#components)
* [Входные параметры](#params)
* [Модификаторы](#modifycators)
* [Директивы](#directives)
* [Вычисляемые свойства](#computed)
* [Наблюдатели](#watch)
* [Стили](#styles)
* [Отрисовка списков](#for)
* [Обработка событий](#event)
* [Пользовательские события](#users-event)



***
VueJS представляет CLI для установки vue и начала работы с активацией сервера. 
* npm install --global vue-cli

***
 Создания проекта с использованием Webpack
* vue init webpack myproject

***
Запуск
* cd myproject
* npm run dev

***

# Компоненты <a name="components"></a>
```javascript
// Определяем новый компонент под именем todo-item
Vue.component('todo-item', {
  template: '<li>Это одна задача в списке</li>'
})
```
Теперь его можно использовать в шаблоне другого компонента:

```html
<ol>
  <!-- Создаём экземпляр компонента todo-item -->
  <todo-item></todo-item>
</ol>
```
Когда экземпляр Vue создан, он добавляет все свойства, найденные в опции data, в систему реактивности Vue. Но! Свойства в data будут реактивными, только если они существовали при создании экземпляра. Т.е. необходимо сразу установить начальное значение.

Каждый экземпляр Vue при создании проходит через последовательность шагов инициализации :
1) настраивается наблюдение за данными;
2) компилируется шаблон;
3) монтируется экземпляр в DOM;
4) обновляется DOM при изменении данных.

<img alt='Жизненный цикл компанента' src="manual/images/life.png"/>














# Входные параметры <a name='params'></a>
При использовании шаблонов в DOM входные параметры в camelCase-стиле в компоненте должны использовать свои эквиваленты в стиле kebab-case (разделённые дефисами).

Указание типа входных параметров:
```javascript
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // или любой другой конструктор
}
```
Для того, чтобы указать Vue, что передается выражение, а не строка, необходимо использовать ```v-bind:```. Это относится к числам, булевым значениям, массивам, объектам.

```html
<!-- Указание входного параметра без значения будет означать `true`. -->
<blog-post is-published></blog-post>

<!-- Несмотря на то, что `false` статическое значение, нам нужен v-bind -->
<!-- чтобы сообщить Vue, что это выражение JavaScript, а не строка.     -->
<blog-post v-bind:is-published="false"></blog-post>
```

Все входные параметры образуют одностороннюю привязку между дочерним свойством и родительским: когда родительское свойство обновляется — оно будет передаваться дочернему, но не наоборот. Изменение входного параметра может потребоваться в нескольких случая:

1. Входной параметр используется для передачи начального значения. В этом случае лучше всего определить локальное свойство в данных, которое использует значение входного параметра в качестве начального:
```javascript
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```
2. Входной параметр передаётся как необработанное значение, которое необходимо преобразовать. В этом случае лучше всего определить вычисляемое свойство с использованием входного параметра:

```javascript
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```
> Но! Объекты и массивы передаются по ссылке, поэтому изменение в дочернем элементе повлияет на данные родительского. В данном случае необходимо сделать копию, например, с помощью reduce или $.extend.

Валидация входных параметров:
```javascript
Vue.component('my-component', {
  props: {
    // Просто проверка типа (`null` и `undefined` проходят проверку для любого типа)
    propA: Number,
    // Несколько допустимых типов
    propB: [String, Number],
    // Обязательное значение строкового типа
    propC: {
      type: String,
      required: true
    },
    // Число со значением по умолчанию
    propD: {
      type: Number,
      default: 100
    },
    // Объект со значением по умолчанию
    propE: {
      type: Object,
      // Для объектов или массивов значения по умолчанию
      // должны возвращаться из функции
      default: function () {
        return { message: 'hello' }
      }
    },
    // Пользовательская функция для валидации
    propF: {
      validator: function (value) {
        // Значение должно соответствовать одной из этих строк
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```
>  Входные параметры валидируются перед созданием экземпляра компонента, поэтому свойства экземпляра (например, data, computed и т.д.) не будут доступны внутри default или функций validator.

Отключить наследование атрибутов можно с помощью 
```javascript
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```
 Cвойство экземпляра ```$attrs``` содержит имена атрибутов и значения, переданные компоненту.
 Опция ```inheritAttrs: false``` не влияет на биндинги style и class.

С помощью ```inheritAttrs: false``` и ```$attrs``` можно вручную определять к какому элементу должны применяться атрибуты, что часто требуется для базовых компонентов:

```javascript
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
```


# Модификаторы <a name='modifycators'></a>

Модификаторы — особые постфиксы, добавляемые после точки, обозначающие, что директива должна быть связана каким-то определённым образом.  

```html
<!-- модификатор .prevent говорит директиве v-on вызвать event.preventDefault() при обработке произошедшего события -->
<form v-on:submit.prevent="onSubmit"> ... </form>
```

# Директивы <a name="directives"></a>

Директивы — это специальные атрибуты с префиксом ```v-```. В качестве значения они принимают одно выражение JavaScript (за исключением v-for). Директива реактивно применяет к DOM изменения при обновлении значения этого выражения. 

Начиная с версии 2.6.0, можно использовать JavaScript-выражение в аргументе директивы, заключив его в квадратные скобки:

```html
<a v-bind:[attributeName]="url"> ... </a>
```

```html
<!--
В шаблонах DOM это преобразуется браузером в v-bind:[someattr].
Если в экземпляре не будет свойства "someattr", такой код не заработает.
-->
<a v-bind:[someAttr]="value"> ... </a>
```

* **v-bind** - используется для добавления атрибутов,  реактивного обновления атрибутов HTML.

```html
<button v-bind:disabled="isButtonDisabled">Кнопка</button>
```
Также есть одна особенность, если значением isButtonDisabled будет null, undefined или false, то атрибут disabled не добавится в элемент ```<button>```.

* [**v-if**](#if) - используется для рендеринга блока по условию.

* [**v-show**](#v-show) - используется для отображения блока по условию, при этом блок всегда находится в DOM.

* **v-for** - использует данные из массива, для отображения списков.

```app4.todos.push({ text: 'Profit' })``` добавит новый элемент в список.
```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```
```javascript
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Изучить JavaScript' },
      { text: 'Изучить Vue' },
      { text: 'Создать что-нибудь классное' }
    ]
  }
})
```

* **v-once** -

* **v-on** - используется для отслеживания событий.
```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Перевернуть сообщение</button>
</div>
```
```javascript
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Привет, Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('');
    }
  }
});
```

* **v-model** - связывает элементы форм и состояние приложения.
```html
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```
```javascript
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Привет, Vue!'
  }
});
```

* **v-once** -  переменная подменяется однократно, не обновиляется при изменении данных. Но это повлияет сразу на все связанные переменные в рамках данного элемента
```html
<span v-once>Это сообщение никогда не изменится: {{ msg }}</span>
```

* **v-html** - для подстановки HTML.
```html
<p>Директива v-html: <span v-html="rawHtml"></span></p>
```
Содержимое тега *span* будет заменено значением свойства *rawHtml*, интерпретированного как обычный HTML.  Нельзя использовать ```v-html``` для вложения шаблонов друг в друга, потому что движок шаблонов Vue не основывается на строках. 

>Динамическая отрисовка произвольного HTML-кода на сайте крайне опасна, так как может легко привести к XSS-уязвимостям. Использовать интерполяцию HTML можно только для доверенного кода, и нельзя подставлять туда содержимое, создаваемое пользователями.

# Вычисляемые свойства <a name='computed'></a>

Вычисляемые свойства кэшируются, основываясь на своих реактивных зависимостях. 


Вычисляемое свойство пересчитывается лишь тогда, когда изменится одна из его реактивных зависимостей. 

```html
<div id="demo">{{ fullName }}</div>
```

```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
computed: {
  fullName: {
    // геттер:
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // сеттер:
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
})
```
При изменении this.firstName или this.lastName будет вызван геттер.  
Запись vm.fullName = 'Иван Иванов' вызовет сеттер, и vm.firstName и vm.lastName будут соответствующим образом обновлены.

# Наблюдатели <a name='watch'></a>

Эта возможность полезна для «дорогих» или асинхронных операций, выполняемых в ответ на изменение данных.
Пример использования, но в данном случае лучше использовать вычисляемые свойства.
```html
<div id="demo">{{ fullName }}</div>
```
```javascript
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

# Стили <a name='styles'></a>

Для динамической установки или удаления CSS-классов можно передавать объект в директиву v-bind:class:   
```html
<!--  Наличие класса active будет определяться истинностью параметра isActiveю. -->
<div v-bind:class="{ active: isActive }"></div>
```
v-bind:class можно использовать совместно с обычным атрибутом class:
```html
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```
В v-bind:class можно передать и массив:
```html
<div v-bind:class="[activeClass, errorClass]"></div>
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```
```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

### inline-стили
Объектная запись для v-bind:style является объектом JavaScript.
```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
```javascript
data: {
  activeColor: 'red',
  fontSize: 30
}
```
Можно использовать и вычисляемые свойства, возвращающие объекты стилей.

# Условная отрисовка <a name='if'></a>

> Псевдоэлемент ```<template>``` служит невидимой обёрткой и сам в результатах отрисовки не появляется.

Блок будет отображаться только в том случае, если выражение директивы возвращает значение, приводимое к true.

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Не A/B/C
</div>
```

**v-else**, **v-else-if** должен следовать сразу за элементом с **v-if** или **v-else-if**.

### v-show <a name='v-show'></a>

```html
<h1 v-show="ok">Привет!</h1>
```
Разница в том, что элемент с v-show будет всегда оставаться в DOM, а изменяться будет лишь свойство display в его параметрах CSS.

**v-show** не работает на элементе ```<template>``` и не работает с **v-else**.

# Отрисовка списков <a name='for'></a>

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```
```javascript
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Родитель',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```
Вместо **in** разделителем можно использовать **of**, как в итераторах JavaScript.

**v-for** можно также использовать для итерирования по свойствам объекта:  
```html
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```
Чтобы подсказать Vue, как отслеживать идентичность каждого элемента, что позволит переиспользовать и перемещать существующие элементы, необходимо указать уникальный атрибут key для каждого элемента:
```html
<div v-for="item in items" v-bind:key="item.id">
  <!-- содержимое -->
</div>
```
Из-за ограничений JavaScript, Vue не способен отследить следующие изменения в массиве:
* Прямую установку элемента по индексу: ```vm.items[indexOfItem] = newValue``` -> ```Vue.set(vm.items, indexOfItem, newValue)```
* Явное изменение длины массива: ```vm.items.length = newLength``` -> ```vm.items.splice(newLength)```
* Vue не может обнаружить добавление или удаление свойств, для добавления свойств можно использовать ```Vue.set```

# Обработка событий <a name='event'></a>
Иногда в inline-обработчиках необходим доступ к оригинальному событию DOM. Его можно передать в метод, используя специальную переменную $event:
```html
<button v-on:click="warn('Форма не может быть отправлена.', $event)">
  Отправить
</button>
```
```javascript
// ...
methods: {
  warn: function (message, event) {
    // теперь у нас есть доступ к нативному событию
    if (event) event.preventDefault()
    alert(message)
  }
}
```
 Vue предоставляет модификаторы событий для v-on, которые указываются как постфиксы и отделяются точкой: *.stop, 
.prevent, 
.capture, 
.self, 
.once, 
.passive*.

```html
<!-- событие click не будет всплывать дальше -->
<a v-on:click.stop="doThis"></a>

<!-- событие submit больше не будет перезагружать страницу -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- модификаторы можно объединять в цепочки -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- и использовать без указания метода-обработчика -->
<form v-on:submit.prevent></form>

<!-- можно отслеживать события в режиме capture, т.е. событие, нацеленное -->
<!-- на внутренний элемент, обрабатывается здесь до обработки этим элементом -->
<div v-on:click.capture="doThis">...</div>

<!-- вызов обработчика только в случае наступления события непосредственно -->
<!-- на данном элементе (то есть не на дочернем компоненте) -->
<div v-on:click.self="doThat">...</div>
```

### Модификаторы клавиш
Можно использовать любые допустимые имена клавиш, предоставляемые через KeyboardEvent.key в качестве модификаторов, именуя их в kebab-case.
```html
<input v-on:keyup.page-down="onPageDown">
```

Модификатор ```.exact``` позволяет контролировать точную комбинацию системных модификаторов, необходимых для запуска события.

```html
<!-- сработает, даже если Alt или Shift также нажаты -->
<button @click.ctrl="onClick">A</button>

<!-- сработает, только когда нажат Ctrl и не нажаты никакие другие клавиши -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- сработает, только когда не нажаты никакие системные модификаторы -->
<button @click.exact="onClick">A</button>
```

### Модификаторы клавиш мыши
*.left, 
.right, 
.middle*


# Пользовательские события <a name='users-event'></a>

Всегда использовать kebab-case для имён событий.

По умолчанию ```v-model``` на компоненте использует входной параметр ```value``` и событие ```input```.

```javascript
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```
Теперь, когда используем ```v-model``` на этом компоненте:
```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```
Значение lovingVue будет передано во входном параметре checked. А обновляться свойство lovingVue будет когда ```<base-checkbox>``` сгенерирует событие change с новым значением. При этом нужно объявлять входной параметр ```checked``` в опции ```props``` компонента.