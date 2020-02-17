 # Webpack
<a name='top'></a>

* [Webpack и Babel для настройки React приложения](#webpack-babel-react)

**Webpack** берёт всё, от чего зависит проект, и преобразует это в статические ресурсы, которые могут быть переданы клиенту. В частности, **Webpack** использует внутренний кэш, благодаря чему модули загружаются на клиент лишь один раз, что, в итоге, приводит к ускорению загрузки сайтов.



 # Webpack и Babel для настройки React-приложения <a name="webpack-babel-react"></a>
 Для того чтобы настроить проект React-приложения, необходимы следующие npm-модули:
 
* **react** — библиотека React.
* **react-dom** — библиотека, которая поможет нам использовать возможности React в браузере.
* **@babel/core** — транспиляция JSX в JS.
* **@babel/preset-env** — создание кода, подходящего для старых браузеров.
* **@babel/preset-react** — настройка транспилятора для работы с React-кодом.
* **babel-loader** — настройка Webpack для работы с Babel.
* **css-loader** — настройка Webpack для работы с CSS.
* **webpack** — сборка модулей.
* **webpack-cli** — работа с Webpack из командной строки.
* **style-loader** — загрузка всего используемого CSS-кода в заголовке HTML-файла.
* **webpack-dev-server** — настройка сервера разработки.

1. Создаем новый проект:

   **npm init**  

2. Устанавливаем некоторые из вышеперечисленных пакетов:

   **npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader webpack webpack-cli style-loader webpack-dev-server**

3. Структура проекта:

   ![](images/structure-project.png)

Некоторые файлы и папки создаются автоматически, некоторые нужно создать самостоятельно.

Папка **component** будет содержать компоненты проекта. В папке **dist**, в файле **main.js**, будет находиться скомпилированный код, а **index.html** — это, как уже было сказано, главный HTML-файл нашего приложения.

**Замечание!** В файле **index.html** должен быть указан тег **script** с подключением файла **main.js**, который будет получен в ходе компиляции проекта. Элемент `<div>` с идентификатором **root** мы будем использовать для вывода React-приложения.


4. Настройка **Webpack**.

Webpack можно настраивать разными способами. В частности, настройки этого инструмента могут принимать вид аргументов командной строки или присутствовать в проекте в виде конфигурационного файла с именем **webpack.config.js**.

```
{
entry: "./src/index.js",
mode: "development",
output: {
    filename: "./main.js"
  },
}
```

Свойство **entry** задаёт главный файл с исходным кодом проекта. Значение свойства **mode** указывает на тип окружения для компиляции (в нашем случае это окружение разработки — development) и на то, куда нужно поместить скомпилированный файл.

5. Установка пакета **react** и **react-dom**:

   **npm install react react-dom**

6. Настройка **Babel**. Добавить в **package.json** следующий раздел:

```
"babel": {
    "presets": [
      "@babel/env",
      "@babel/react"
    ]
  }
```

Благодаря этим настройкам Babel будет знать о том, какие пресеты ему нужно использовать.

7. Настройка **Webpack** на работу с **Babel**:

Тут используется библиотека **babel-loader**, которая позволит использовать Babel с Webpack. Фактически, Babel сможет перехватывать и обрабатывать файлы до их обработки Webpack.

В файле **webpack.config.js**:

```
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "./main.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};
```

В свойстве **rules** представленного здесь объекта хранится массив правил, в соответствии с которыми должен быть обработан файл, заданный регулярным выражением, описанным в свойстве test. В данном случае правило будет применяться ко всем файлам с расширениями .m и .js, при этом файлы из папок node_modules и bower_components мы транспилировать не хотим. Далее, тут мы указываем, что мы хотим пользоваться **babel-loader**. После этого наши JS-файлы будут сначала обрабатываться средствами **Babel**, а потом упаковываться с помощью Webpack.

8. Команда для запуска сервера разработки и запуска сервера:

В **package.json**, в раздел scripts, добавить команду для запуска сервера разработки и команду для запуска сборки проекта:

```
"scripts": {
    "dev": "webpack-dev-server",
    "start": "webpack"
  },
```

Запустить сервер разработки следующей командой:

**npm run dev**

Страница раздела находится по адресу <a href="http://localhost:9000">http://localhost:9000</a>.

Cобрать проект возможно следующей командой:

**npm run start**

[^Вверх](#top)
# Настройка проекта Vue <a name='vue'></a>
1. Создаем **package.json**:
```
npm init
```

2. Добавляем зависимости в **package.json**:
```javascript
"dependencies": {
    "vue": "2.6.11",
    "vuex": "3.1.2"
  },
  "devDependencies": {
    "webpack": "4.41.6",
    "vue-loader": "15.9.0", // указывает кабудут загружаться файлы .vue
    "buble": "0.19.8",
    "buble-loader": "0.5.1",
    "css-loader": "3.4.2",
    "html-webpack-loader": "0.0.5",
    "vue-template-compiler": "2.6.11", // необходим для vue-loader
    "webpack-dev-server": // динамически собирать и запускать на выполнение приложение
  }
  ```
  Добавить команды:
  ```javascript
  "scripts": {
      "dev": "webpack-dev-server --hot --open",
      "build": "webpack"
    }
  ```
  *dev* - позволяет на лету сгенирировать файл сборки и запустить проект. `--hot` позволяет использовать Hot Module Replacement, который взаимодействует с  *vue-loader* и позволяет повторно произвести рендеринг каждой модели Vue. `--open` позволяет запустить браузер для обращения к приложению.


  4. Создание файлов проекта:  
  *index.html* с корневым блоком `<div id='app'></div>`, поклчючить скрипт `<script src="dist/build.js"></script>`;  
  *src/main.js* с импортом vue и созданием экземпляра, импортировать здесь корневой компонент;  
  *src/App.vue* корневой компонент.
  ...

  5. Создание файла конфигурации webpack:  
  `config/webpack.config.js`  
  В нем указывается какие лоадеры должны обрабатывать файлы.

```javascript
var path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // плагин для загрузки кода Vue
 
module.exports = {
 entry: './src/main.js', //входна точка приложения
 output: {  // выходные параметры сборки
   path: path.resolve(__dirname, './dist'),
   publicPath: '/dist/',
   filename: 'build.js'
 },
 module: {
   rules: [
     {
       test: /\.vue$/,
       loader: 'vue-loader'
     }, {
      test: /\.css$/,
      use: [
        'vue-style-loader',
        'css-loader'
      ]
    }
   ]
 },
 plugins: [
    new VueLoaderPlugin() // добавляет плагин, с помощью которого загружается код vue
   ]
}
```
  В **package.json** прописать в scripts/build:  
  `"build": "webpack --config config/webpack.config.js main.js build.js"`

  6. Установка пакетов:
  ```
  npm install
  ```
  
  7. Запуск проекта:
  ```
  npm run dev
  ```
