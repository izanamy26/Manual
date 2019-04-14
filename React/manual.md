# REACT 

1. [JSX](#jsx)
2. [Метод render](#render)
3. [Функциональные компоненты](#functional-components)
4. [Компоненты, основанные на классах](#class-components)
5. [Состояние компонентов](#component-state)

* [Полезное](#sweet)

1.
* npm i -g create-react-app
* npx create-react-app react-tutorial
* npm start (из react-tutorial папки)

2.
* npm create-react-app my-app
* cd my-app
* npm start

# Импортировать библиотеку react и react-dom
```javascript
import React from "react";
import ReactDOM from "react-dom";
```

# JSX <a name='jsx'></a>
Фундаментально, JSX является синтаксическим сахаром для функции 
```javascript
React.createElement(component, props, ...children)
```
JSX код:
```javascript
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>
```
компилируется в:
```javascript
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```
Также можно использовать самозакрывающую форму для тегов, у которых нет потомков. 
```javascript
<div className="sidebar" />
```
компилируется в:
```javascript
React.createElement(
  'div',
  {className: 'sidebar'},
  null
)
```
Типы, определенные с Прописной буквы, указывают на то, что тег ссылается на компонент React. Эти теги в процессе компиляции ссылаются на именованную переменную, содержащую компонент React. Поэтому эта переменная должна находится в области видимости. Например: Если используется выражение JSX — <Foo />, то переменная Foo должна находится в области видимости.

Если вы не используется какой-либо упаковщик JavaScript и добавляется React непосредственно в тег ```<script>```, то React всегда будет находиться в глобальной области видимости.

## Использование нотации через точку в JSX типе

На компонент React можно ссылаться используя нотацию через точку в JSX. Это удобно, если у вас есть модуль, который экспортирует несколько компонентов React. Например, если MyComponents.DatePicker — это компонент, то вы можете использовать эту нотацию непосредственно в JSX:
```javascript
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

**Вновь определенные компоненты, не входящие в стандартную библиотеку React, должны именоваться с Прописной буквы.**

Если тип элемента именуется со строчной буквы, это означает, что элемент является встроенным компонентом таким как ```<div>``` или ```<span>``` и передается в виде строки 'div' или 'span' в функцию React.createElement. Типы, определенные с прописной буквы, такие как ```<Foo />``` компилируются как React.createElement(Foo) и ссылаются на компонент, определенный или импортированный в вашем JavaScript файле.

## Выбор типа во время выполнения
Нельзя использовать общее выражение в типе элемента React. Если вам необходимо использовать общее выражение для определения типа элемента, сначала присвойте его переменной, именованной с Прописной буквы. Это часто необходимо для отображения разных компонентов в зависимости от значения свойства в props:

```javascript
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Правильно! JSX тип может быть переменной, именуемой с Прописной буквы.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

## JavaScript выражения

Вы можете разместить любое JavaScript выражение в свойстве, заключив его в фигурные скобки **{}**. 

Инструкции if или циклы for не являются выражениями в JavaScript, поэтому они не могут использоваться непосредственно в JSX. Поэтому их необходимо использовать только в окружающем коде.

```javascript
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>even</strong>;
  } else {
    description = <i>odd</i>;
  }
  return <div>{props.number} is an {description} number</div>;
}
```

```javascript
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```

## Если вы укажете в компоненте JSX свойство и не укажете его значение, то значение свойства по умолчанию установится в true.

## Разворачивание атрибутов 
Если есть объект, содержащий свойства, и необходимо передать его в JSX, вы можете использовать ```...``` в качестве "разворачивающего" (spread) оператора для передачи всех свойств, содержащихся в объекте.

```javascript
// App1 и Арр2 эквивалентны
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```
Разворачивание атрибутов может быть полезно при реализации универсальных контейнеров. В то же время, разворачивание может сделать ваш код грязным, т.к. при разворачивании в компонент в качестве свойств передаются все свойства объекта, в том числе те, в которых компонент не нуждается и которые не обрабатывает.

## Потомок (children) в JSX
В JSX выражении, которое содержит открывающий и закрывающий тег, контент, заключенный между этими тегами, при компиляции передается в специальное свойство: **props.children**.

JSX удаляет пробелы в начале и конце строки. Он также удаляет пустые строки. Переводы строк, примыкающие к тегам будут удалены. Переводы строк, находящиеся в середине строкового литерала и следующие один за другим преобразуются в один перевод строки. 

## Функции JavaScript

Как правило, JavaScript выражения, используемые в JSX возвращают строки, элементы React или и то и другое вместе. Однако, props.children работает также как и любое другое свойство, в которое можно передать любой вид данных, а не только данные тех типов, которые React знает как отобразить. Например, можно определить некий компонент, и принять от него обратный вызов через props.children:

```javascript
function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}

// Вызывает "потомка - функцию обратного вызова" numTimes раз для отображения повторяемого компонента
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}
```
В компонент в качестве потомка можно передавать что угодно. Главное — этот компонент должен преобразовать и вернуть к моменту отображения (рендеринга) то, что React знает как отобразить.

## Булевые значения, Null и Undefined игнорируются
**false**, **null**, **undefined** и **true** можно использовать в качестве потомков. Но данные значения не отображаются при рендеринге.

```javascript
<div>
  {showHeader && <Header />}
  <Content />
</div>
```



















# Метод render <a name='render'></a>
```javascript
ReactDOM.render(JSX-компонент, место вывода компонента)
```

# Функциональные компоненты <a name='functional-components'></a>
Функциональные компоненты устроены так, что в теле функции должна быть команда, возвращающая JSX-код, который и представляет соответствующий компонент.

```javascript
function MyApp() {
  return <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
  </ul>
}
```


# Компоненты, основанные на классах <a name='class-components'></a>

Описание компонента, основанного на классах, начинается с ключевого слова ```class```. Затем идёт имя компонента, составляемое по тем же правилам, что и имена функциональных компонентов. Далее указывается, что прототипом является компонент React, с помощью конструкции ```extends React.Component```.

У компонента, основанного на классах, должен быть, по меньшей мере, один метод - ```render()```.

Свойства компонента являются свойствами класса, поэтому обащение к ним осуществляется с помощью ключевого слова ```this```.
```javascript
class App extends React.Component {
    render() {
        return (
            <div>
                <h1>{this.props.whatever}</h1>
            </div>
        )
    }
}
```

# Состояние компонентов <a name='component-state'></a>
Состояние (**state**) - это данные, которыми управляет компонент.

Если некоему компоненту нужно работать с состоянием, то это должен быть компонент, основанный на классе. 

Для того чтобы оснастить компонент состоянием сначала нужно создать конструктор класса.

В коде конструктора необходимо выполнить вызов конструктора родительского класса с помощью функции ```super()```.

Для того, чтобы оснастить компонент состоянием нужно в конструкторе, добавить к экземпляру класса свойство **state**.

```javascript
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            answer: "Yes"
        }
    }
    
    render() {
        return (
            <div>
                <h1>Is state important to know? {this.state.answer}</h1>
            </div>
        )
    }
}
```



















# Полезное <a name='sweet'></a>
[Oнлайн компиляторе Babel](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-0&code=function%20hello()%20%7B%0A%20%20return%20%3Cdiv%3EHello%20world!%3C%2Fdiv%3E%3B%0A%7D)
[Oнлайн React](https://codesandbox.io/s/new)