# REACT 

1. [JSX](#jsx)
2. [Метод render](#render)
3. [Функциональные компоненты](#functional-components)


* npm i -g create-react-app
* npx create-react-app react-tutorial
* npm start (из react-tutorial папки)

# Импортировать библиотеку react и react-dom
```javascript
import React from "react";
import ReactDOM from "react-dom";
```

# JSX <a name='jsx'></a>


# Метод render <a name='render'></a>
```
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