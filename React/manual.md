# REACT 

* [JSX](#jsx)
* [Метод render](#render)
* [Функциональные компоненты](#functional-components)
* [Компоненты, основанные на классах](#class-components)
* [Состояние компонентов](#component-state)
* [Обработка событий](#event)
* [Методы жизненного цикла](#live-loop-component)
* [Подъем состояния](#lift-state)
* [Ленивая загрузка](#lazy-load)
* [Контекст](#context)
* [Передача пропсов и состояний](#moving-state-props)

* [Маршрутизация](#router)
* [Redux](#redux)
* [Jest](#jest)


* <a src="https://ru.reactjs.org/docs/getting-started.html">Документация React</a>
* [Полезное](#sweet)

*****
* npm i -g create-react-app
* npx create-react-app react-tutorial
* npm start (из react-tutorial папки)

****
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

Элемент ```<Fragment></Fragment>``` (короткая запись ```<></>```) используется для группировки элементов без нарушения верстки.  

**class** - **className**  
**for** - **htmlFor**


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

Также можно использовать объекты для вставки, что-то похожее на слоты Vue: 
```html
<SplitPane left={ <Contacts /> } right={ <Chat /> } />
```
В ```SplitPane``` теперь можно использовать в местах вставки ``` {props.left}``` и ```{props.right}```.  

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
Задачей этого метода является определение того, как будет выглядеть компонент. В процессе жизни компонента может быть вызван множество раз.
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

Для изменения состояния используется метод - **setState()**. Метод должен возвращать новое состояние, а не модифицировать старое.

```javascript
handleClick() {
    this.setState(prevState => {
        return {
            count: prevState.count + 1
        }
    })
}
```
Использовать оператор ```++``` в данном случае нельзя, так как он приводит к модификации **prevState.count**


# Методы жизненного цикла <a name='live-loop-component'></a>

## Метод componentDidMount <a name='componentDidMount'></a>
Этот метод срабатывает один раз после того, как компонент будет смонтирован (вставлен) в дерево DOM. При этом после повторного рендеринга метод вызывн не будет. Происходит это из-за того, что при выполнении подобных операций не производится изъятие компонента из дерева DOM и его последующее повторное включение в состав дерева. 

Метод **componentDidMount()** обычно используют для выполнения обращений к неким API, в случаях, когда разработчику нужны данные из внешних источников. 


## Метод componentWillReceiveProps (устаревший метод) <a name='componentWillReceiveProps'></a>
Данный метод вызывается каждый раз, когда родительский компонент передаёт свойства дочернему компоненту.
```javascript
componentWillReceiveProps(nextProps) {
    if (nextProps.whatever !== this.props.whatever) {
        // сделать тут что-то важное
    }
}
```


## Метод shouldComponentUpdate (устаревший метод) <a name='shouldComponentUpdate'></a>
Метод даёт разработчику возможность оптимизировать приложение. Здесь можно реализовать некую логику, помогающую выяснить необходимость обновления компонента.
```javascript
shouldComponentUpdate(nextProps, nextState) {
    // вернуть true если компонент нуждается в обновлении
    // вернуть false в противном случае
}
```
При этом из этого метода, если компонент нуждается в повторном рендеринге, с учётом новых свойств и состояния, нужно вернуть true. В противном случае из него нужно вернуть false.


## Метод componentWillUnmount (устаревший метод) <a name='componentWillUnmount'></a>
Метод вызывается когда компонент удаляется из DOM-дерева. Этот метод, в основном, используется для того, чтобы освобождать ресурсы, занятые компонентом и навести перед его удалением порядок.


## Метод getDerivedStateFromProps <a name='getDerivedStateFromProps'></a>
На основании принятых им свойств, должен возвратить обновлённое состояние. Он используется в тех случаях, когда некий компонент должен принимать входящие свойства, получаемые им от компонента-родителя, и настраивать своё состояние, основываясь на этих свойствах. 
```javascript
static getDerivedStateFromProps(props, state) {
}
```


## Метод getSnapshotBeforeUpdate <a name='getSnapshotBeforeUpdate'></a>
Метод жизненного цикла, который позволяет создавать нечто вроде резервной копии того, что имеется в компоненте перед его обновлением. Она напоминает мгновенный снимок состояния приложения. 
```javascript
getSnapshotBeforeUpdate() {
}
```



# Обработка событий <a name='event'></a>





# Подъем состояния <a name='lift-state'></a>
Из дочерненого компонента можно поднять состояние до родителя через пропсы.  
В дочеренем компоненте:
```html
<!-- компонент TemperatureInput -->
<input value={temperature} onChange={this.handleChange} />
```
```javascript
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }
```

В родительском компоненте:
```html
<!-- пропсом передается "обработчик" -->
 <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
```
```javascript
// параметром обработчика является поднимаемое состояние
 handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }
```

# Ленивая загрузка <a name='lazy-load'></a>
```React.lazy``` -  позволяет рендерить динамический импорт как обычный компонент.  

Компонент с ленивой загрузкой должен рендериться внутри компонента ```<Suspense></Suspense>```, который позволяет показать запасное содержимое (например, индикатор загрузки) пока происходит загрузка ленивого компонента.

```javascript
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Загрузка...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

# Контекст <a name='context'></a>
```const MyContext = React.createContext(defaultValue)``` - создание объекта Context.  
```<MyContext.Provider value={/* некоторое значение */}>``` - провайдер-компонент позволяет дочерним компонентам, подписаться на изменения контекста, который используют. Провайдер-кмпоненты могут быть вложены друг в друга, переопределяя контекст. По изменению *value* дочерние компоненты перерендерятся, даже не смотря на *shouldComponentUpdate*.  
```MyClass.contextType = MyContext``` - далее в классе можно использовать контекст через ```this.context```, так же простсто в самом классе указать ```static contextType = MyContext```.  
```<MyContext.Consumer>{value => /* отрендерить что-то, используя значение контекста */}</MyContext.Consumer>``` - *Consumer* принимает функцию в качестве дочернего компонента. Эта функция принимает текущее значение контекста и возвращает React-компонент.  
```MyContext.displayName = 'MyDisplayName'``` - можно задать имя контекса при отображении в React DevTools.  







# Передача пропсов и состояний <a name='moving-state-props'></a>
Передача пропсов вниз по дереву через длиную цепочку компонентов:  

### 1. Композиция:  
Можно передать сам компонент по дереву компонентов, если необходимо передавать много пропсов по дереву, но при этом всё равно в каждом вложенном компоненте необходимо прокидывать пропс. Т.е. присваиваем компонент константе, константу прокидываем как пропс и дальше также прокидываем через всё необходимую цепочку компонентов, дале используем как ```{props.SomeComponent}```.

### 2. Рендер-пропсы:

### 3. [Контекст](#context):




















# Маршрутизция <a name='router'></a>
<a href='https://reacttraining.com/react-router/web/guides/quick-start'>Документация</a>  

```<Link>``` - Навигация по клику (компонент);  
```<Redirect>``` - Перенаправление (компонент);
```Route``` - Маршрутизация (компонент);  
```history``` - История (свойство).

**HashRouter** - используется для статических сайтов.  
**BrowserRouter** - для динамических.

Компонент **Router** ожидает только один элемент в качестве дочернего. Компонент принимает *prop* - **path**, который описывает необходимый маршрут, он сопоставляется с ```location.pathname```. есди положительно, то компоонент рендерится.

npm пакет **path-to-regexp** компилирует prop **path** в регулярное выражение и сопоставляет его с ```location.pathname```.  

Когда пути сопоставляются создается объект **match** который содержит свойства:  
**url** — сопоставляемая часть текущего ```location.pathname```;   
**path** — путь в компоненте ```Route```;  
**isExact** — path в ```Route === location.pathname```;  
**params** — объект содержит значения из path, которые возвращает модуль **path-to-regexp**.

```<Switch/>``` - компонент группирования Route'ов, итеративно проходит по дочерним компонентам и рендерит только первый, который подходит под ```location.pathname```.

У **Rоuter** есть 3 prop'са, которые указываю, что рендерить при совпадении пути:  
**component** — React компонент, который будет рендериться при совпадении пути.  
**render** — функция которая должна вернуть элемент React. ```render``` довольно похож на component, но используется для inline рендеринга.  
**children** — в отличие от предыдущих двух props children будет всегда отображаться, независимо от того сопоставляется ли path или нет.

Элементу отрендеренному **Route** будет передано несколько *props*. **match** — объект сопоставления path с ```location.pathname```, объект **location** и **history** - объект, созданный самим роутом.

**Route** для главной страницы содержит prop **exact**, благодаря которому пути сравниваются строго.

```javascript
import { Switch, Route } from 'react-router-dom'
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/product' component={Pproduct}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
);
```

```:number``` часть строки в ```/product/:number``` означает, что часть **path** после ```/product/``` будет получена в виде переменной и сохранится в ```match.params.number```. 

Компонент ```<Link />``` меняет адрес URL и рендерит необходимый элемент. Т.е. обновляет контент без перезагрузки страницы.

```<Link/>``` использует *prop* **to** для описания URL куда следует перейти. *Prop* **to** может быть строкой или **location** объектом, который состоит из pathname, search, hash, state свойств. Если это строка то она конвертируется в **location** объект.




# Redux <a name='redux'></a>
```
npm install --save redux
npm install --save react-redux
npm install --save-dev redux-devtools
```






# Jest <a name='jest'></a>

















# Полезное <a name='sweet'></a>
[Oнлайн компиляторе Babel](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-0&code=function%20hello()%20%7B%0A%20%20return%20%3Cdiv%3EHello%20world!%3C%2Fdiv%3E%3B%0A%7D)

[Oнлайн React](https://codesandbox.io/s/new)
