# Redux <a name='home'></a>

[1. Концепция Redux](#redux)  
[2. react-redux](#react-redux)

# Концепция Redux <a name='redux'></a>

**Состояние (State)** - один неизменяемый объект.

**Действия (Actions)** - литералы JS, предоствляющие инструкции, необходимые для внесения в состояние.
Действия лучше выносить как константы в отдельный файл:

```javascript
const actions = { SORT_COLOR: 'SORT_COLOR', ... };
```

Действия предсталяют собой объекты: которые имеют как минимум поле типа плюс дополнительную информацию.

```javascript
{
  type: actions.SORT_COLOR, [payload];
}
```

**Преобразователи (Reducers)** - функции, которые получают текущее состояние и действие в виде аргументов и использует их для создания и возвращения нового состояния. Должны быть чистыми функциями.

```javascript
const reducer = (state={}, action) => {
    switch (action.type) {
        case actions.SORT_COLOR:
            return {...}; //new state
        case actions.SOME_ACTION:
            return {...}; // new state
        default:
            return state;
    }
}
```

**Хранилище (Store)** - хранится состояние.  
`createStore(reducer)` - создание хранилище.  
`combineReducerrs` - сводит все редьюсеры в один. Чтобы сосздать полное дерево состояний из всех редьюсеров:

```javascript
const store = createStore(
    combineReducers({ reducer1, reducer2, ... }, initialState)
);
```

`store.getState()` - получение состояния.  
`store.dispatch({ type: actionType, ...payload })` - диспетчеризация действия.  
`store.subscribe` - подписка функций-обработчиков, вызывается после каждого завершения диспетчеризации действия. Возвращает функцию, которую можно использовать для прекращения подпииски слушателя.

```javascript
const unsubscribe = store.subscribe(() => { ... });
unsubscribe(); // прекращение подпииски слушателя
```

Используется, например, для обновления состояния в LocalStorage.

**Создатели действий** - функции, которые создают и возвращают литералы действий.

```javascript
const someAction = (payload) => ({
    type: actions.SOME_COLOR,
    ...payload
});

// Использование
store.dispatch(sommeAction({ item: 1, ... }));
```

`compose` - функция, которая собирает несколько функций в одну. Функции собираются справа налево.

```javascript
const print = compose(
    titles => titles.join(', '),
    map => map(c = > c.title),
    state => state.titles
);

print(store.getState());
```

Передача стора через контекст:

- В классовом компоненте:  
  `getChildContext` - функция жизненного цикла, возвращает объект, опрделяющий контекст.

```javascript
getChildContext() {
   return { store: this.props.store };
}
```

`childContetxTypes` - определяет тип контекста.

```javascript
childContextTypes = {
  store: PropTypes.object.isRequired,
};
```

```javascript
const { store } = this.context;
```

- Объект контекста передается функциональным компонентам, не имеющим состояние, в виде второго аргумента, следующего после свойств.

# react-redux <a name='react-redux'></a>

**react-redux** предоставляет компонент провайдер, служащий для настройки хранилища в контексте:

```javascript
import { Provider } from "react-redux";

const store = storeFactory();

render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

`connect` - функция высшего порядка, которая возвращает компонент.

```javascript
const NewComponent = connect(mapStateToProps, mapDispatchToProps)(Element);
```
