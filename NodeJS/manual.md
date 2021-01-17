# NodeJS <a name='home'></a>   
<a href='https://nodejs.org/ru/docs/'>Документация</a>  
<a href='https://nodejs.org/api/'>Модули</a>

<div class='source'>Источники
  <div class='spoiler'> 
  <a href='https://metanit.com/web/nodejs/'>metanit.com</a>
  </div>
</div>

* [Передача параметров приложению](#argv)
* [Модули](#moduls)
* [NPM](#npm)
* [Работа с файлами](#files)
* [События](#events)
* [Stream (Потоки)](#stream)
* [Pipe (Канал)](#pipe)
* [Сервер](#server)
* [Express](#express)
* [Шаблоны](#templates)
* [Таймеры](#timers)
* [MongoDB](#mongo)
  * [Mongoose](#mongoose)
* [Сокеты](#socket)
* [Аутентификация](#auth)
* [Архитектура](#architect)
* [TypeScript](#typescript)


[^ Вверх](#home)  
# Передача параметров приложению <a name='argv'></a>
Для получения параметров, переданных через консоль, в коде приложения применяется массив ```process.argv```.

Первый элемент этого массива всегда указывает на путь к файлу node.exe, который вызывает приложение. Второй элемент массив всегда указывает на путь к файлу приложения, который выполняется. Остальные уже переданные параметры.
Вызов:  
```
node app.js Tom 23
```
```javascript
let nodePath = process.argv[0];
let appPath = process.argv[1];
let name = process.argv[2];
let age = process.argv[3];
```


[^ Вверх](#home)  
# Модули <a name='moduls'></a>
В отличие от встроенных модулей для подключения своих модулей надо передать в функцию require относительный путь с именем файла (расширение файла необязательно). Однако, если а проекте есть папка с вложенным файлом ```index.js```, то к модулю можно обращаться по имени папки.
```javascript
const greeting = require("./greeting");
```
Объект **module** представляет ссылку на текущий модуль.

Для экспорта модулей необходимо указатб данные в объекте ```module.exports```.  Объект ```module.exports``` - это то, что возвращает функция ```require()``` при получении модуля.

Подключаемые модули кэшируются.

Node.js предоставляет специальный объект **global**, который предоставляет доступ к глобальным, то есть доступным из каждого модуля приложения, переменным и функциям. При этом к глобальным переменным можно обратиться либо просто по имени ли через объект ```global.[имя переменной]```.


[^ Вверх](#home)
# NPM <a name='npm'></a>
NPM устанавливается сразу с Node.js. Чтобы обновить, можно использовать команду:
```
npm install npm@latest -g
```
Чтобы узнать текущую версию npm, можно использовать команду:
```
npm -v
```
Флаг --save указывает, что информацию о добавленном пакете надо добавить в файл package.json.
```
npm install express --save
```
```
{
  "name": "modulesapp",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.14.0"
  },
  "devDependencies": {  //для разработки
    "jasmine-node": "^1.14.5"
  }
}
```
Далее команда, установит все зависимости:
```
npm install
```

Для удаления пакетов используется команда ```npm uninstall```. Эта команда удаляет пакет из папки node_modules, в то же время в файле package.json информация о данном пакете остается. Чтобы удалить информацию также и из package.json, применяется флаг --save:
```
npm uninstall express --save
```
NPM позволяет определять в файле package.json команды, которые выполняют определенные действия.
```
{
  "name": "modulesapp",
  "version": "1.0.0",
  "scripts" : {
    "start" : "node app.js",
    "dev" : "node app.js Tom 26"
  }
}
```
В секции **script** добавляются команды с зарезервированными (например, start, test, run и т.д.) или произвольными командами.

Для зарезервированных команд:
```
npm [название_команды]
```
Для произовльных:
```
npm run [название_команды]
```


[^ Вверх](#home)
# Работа с файлами <a name='files'></a>
```fs.readFileSync``` - синхронное чтение из файла.  
```javascript
let fileContent = fs.readFileSync("hello.txt", "utf8");
```
```fs.readFile``` - асинхронное чтение из файла. 
```javascript
fs.readFile("hello.txt", "utf8", function(error,data){ });
```
```fs.writeFileSync``` - для синхронной записи данных в файл.
```javascript
fs.writeFileSync("hello.txt", "Привет ми ми ми!")
```
```fs.writeFile``` - для асинхронной записи данных в файл.
```javascript
fs.writeFile("hello.txt", "Привет МИГ-29!", function(error){};
```
```fs.appendFile``` - для асинхронной дозаписи данных в файл.  
```fs.appendFileSync``` - для синхронной дозаписи данных в файл.
```javascript
const fs = require("fs");
 
fs.appendFileSync("hello.txt", "Привет ми ми ми!");
 
fs.appendFile("hello.txt", "Привет МИД!", function(error){
    if(error) throw error; // если возникла ошибка             
    console.log("Запись файла завершена. Содержимое файла:");
});
```
```fs.unlinkSync``` - для удаления файла в синхронном варианте, в качестве параметра принимает путь к удаляемому файлу.  
```javascript
fs.unlinkSync("hello.txt");
```
```fs.unlink``` - для асинхронного удаления файла, принимает путь к файлу и функцию, вызываемую при завершении удаления.
```javascript
fs.unlink("hello.txt", function(err) {
  if (err) console.log(err); // если возникла ошибка    
  else console.log("hello.txt was deleted");
});
```


[^ Вверх](#home)
# События <a name='events'></a>
Подавляющее большинство функционала Node.js применяет асинхронную событийную архитектуру, которая использует специальные объекты - эмиттеры для генерации различных событий, которые обрабатываются специальными функциями - обработчиками или слушателями событий. Все объекты, которые генерируют события, представляют экземпляры класса **EventEmitter**.

```eventEmitter.on()``` - для добавления обработчиков.  
```emitter.emit(nameEvent, param)``` - эмитация / триггер события. Где **name** - название события, **param** - параметры, может быть объектом, котрые передаются в функцию обработчик.

```javascript
const Emitter = require("events");
let emitter = new Emitter();
let eventName = "greet";
emitter.on(eventName, function(data){ //data  - передаваемые параметры в функцию-обработчик
    console.log("Hello all!");
});
 
emitter.on(eventName, function(data){
    console.log("Привет!");
});
 
emitter.emit(eventName);
```

**Наследование от EventEmitter**  
В приложении мы можем оперировать сложными объектами, для которых также можно определять события, но для этого их надо связать с объектом EventEmitter. 

ES5 вариант:
```javascript
const util = require("util");
const EventEmitter = require("events");
 
function User(){
}
util.inherits(User, EventEmitter); // связывание с EventEmitter
 
let eventName = "greet";
User.prototype.sayHi = function(data){
    this.emit(eventName, data);
}
let user = new User();
// добавляем к объекту user обработку события "greet"
user.on(eventName, function(data){ // подписка на событие из экземпляра другого объекта
    console.log(data);
});
 
user.sayHi("Мне нужна твоя одежда...");
```
ES2015 вариант (упрощается работа, так как классы позволяют отнаследоваться, поэтому не требуется модуль **util**):
```javascript
const EventEmitter = require("events");
  
let eventName = "greet";
 
class User extends EventEmitter {
    sayHi(data) {
        this.emit(eventName, data);
    }
}
 
let user = new User();
// добавляем к объекту user обработку события "greet"
user.on(eventName, function(data){
    console.log(data);
});
  
user.sayHi("Мне нужна твоя одежда...");
```

[^ Вверх](#home)
# Stream (Потоки) <a name='stream'></a>

Потоки данных бывают различных типов, среди которых можно выделить потоки для чтения и потоки для записи.
  
```javascript
const http = require("http");
 
http.createServer(function(request, response){
     }).listen(3000);
  ```
  Параметры request и response, которые передаются в функцию и с помощью которых можно получать данные о запросе и управлять ответом, представляют собой потоки: request - поток для чтения, а response - поток для записи.

  Для записи и считывания данных из потока так же могут применяться потоки.  

  ```fs.createWriteStream(fileName)``` - создает поток для записи в файл, если файла нет, то он создается.  
  ```write(data)``` - используется для записи в файл.  
  ```end(data)``` - используется для оканчания записи.


```fs.createReadStream(fileName, charset)``` - содает поток для чтения из файла, передаются название файла и кодировка.

Сам поток разбивается на ряд кусков или чанков (**chunk**). И при считывании каждого такого куска, возникает событие **data**. С помощью метода ```on()``` можно подписаться на это событие и вывести каждый кусок данных в консоль.

```javascript
const fs = require("fs");
 
let writeableStream = fs.createWriteStream("hello.txt");
writeableStream.write("Привет мир!");
writeableStream.write("Продолжение записи \n");
writeableStream.end("Завершение записи");
let readableStream = fs.createReadStream("hello.txt", "utf8");
 
readableStream.on("data", function(chunk){ 
    console.log(chunk);
});
```

[^ Вверх](#home)
# Pipe (Канал) <a name='pipe'></a>
**Pipe** - это канал, который связывает поток для чтения и поток для записи и позволяет сразу считать из потока чтения в поток записи, т.е. копирование из одного файла в другой.

```javascript
const fs = require("fs");
 
let readableStream = fs.createReadStream("hello.txt", "utf8");
let writeableStream = fs.createWriteStream("some2.txt");
 
readableStream.pipe(writeableStream);
```


[^ Вверх](#home)  
# Сервер <a name='server'></a>
Для работы с **сервером** и **протоколом http** в Node.js используется модуль **http**.  

```http.createServer(function(request, response))``` - используется для создания сервера. Возвращает объект **http.Server**. Принимает коллбек, в котором параметр **request** - хранит информацию о запросе, **response** - управляет отправкой ответа.  
```listen(portNumber)``` - для прослушивания и оброботки входящих подключений. Принимает номер порта, по которому запускается сервер.  

## Request
Параметр **request** позволяет получить информацию о запросе и представляет объект ```http.IncomingMessage```. Основные свойства объекта:  
* **headers** - возвращает заголовки ответа.  
* **method** - тип запроса (GET, POST, PUT, DELETE).  
* **url** - представляет запрошенный адрес.

## Response
Параметр **response** управляет отправкой ответа и представляет объект ```http.ServerResponse```. Основные методы: 
* **statusCode** - устанавливает статусный код ответа.  
* **statusMessage** - устанавливает сообщение, отправляемое вместе со статусным кодом.  
* **setHeader(name, value)** - добавляет ответ в один заголовок.  
* **write** - пишет в поток ответа некоторую информацию.  
* **writeHead** - добавляет в ответ статусный код и набор заголовков.  
* **end** - сигнализирует серверу, что заголовки и тело ответа установлены, в итоге ответ отсылается клиенту. Данный метод должен вызываться в каждом запросе.

```javascript
const http = require("http");
 
http.createServer(function(request, response){
     
    response.setHeader("UserId", 12);
    response.setHeader("Content-Type", "text/html; charset=utf-8;");
    response.write("<h2>hello world</h2>");
    response.end();
}).listen(3000);
```

## Маршрутизация
Если необходимо разграничить простейшую обработку пары-тройки маршрутов, то вполне можно использовать для этого свойство **url** объекта **Request**, иначе лучше использовать **Express**.

**Переадресация** предполагает отправку статусного кода **301** (постоянная переадресация) или **302** (временная переадресация) и заголовка Location, который указывает на новый адрес.
```javascript
const http = require("http");
  
http.createServer(function(request, response){
     
    response.setHeader("Content-Type", "text/html; charset=utf-8;");
     
    if(request.url === "/"){  // маршрутизация
        response.statusCode = 302; // временная переадресация
        // на адрес localhost:3000/newpage
        response.setHeader("Location", "/newpage");
    }
    else if(request.url == "/newpage"){ // маршрутизация 
        response.write("New address");
    }
    else{
        response.write("Not Found");
        response.statusCode = 404; // адрес не найден
    }
    response.end();
}).listen(3000);
```

**Отправка статического файла:**  
```javascript
const http = require("http");
const fs = require("fs");
  
http.createServer(function(request, response){
      
    console.log(`Запрошенный адрес: ${request.url}`);
    // получаем путь после слеша
    const filePath = request.url.substr(1);
    fs.readFile(filePath, function(error, data){
              
        if(error){
                  
            response.statusCode = 404;
            response.end("Resourse not found!");
        }   
        else{
            response.end(data);
        }
    });
}).listen(3000, function(){
    console.log("Server started at 3000");
});
```
## Шаблоны
```html
<!DOCTYPE html>
<html>
<head>
    <title>Главная</title>
    <meta charset="utf-8" />
</head>
<body>
    <h1>{header}</h1>
    <p>{message}</p>
</body>
<html>
```
```javascript
const http = require("http");
const fs = require("fs");
 
http.createServer(function(request, response){
     
    fs.readFile("index.html", "utf8", function(error, data){
                 
        let message = "Изучаем Node.js"; 
        let header = "Главная страница";
        data = data.replace("{header}", header).replace("{message}", message);
        response.end(data);
    })
}).listen(3000);
```

[^ Вверх](#home)
# Express <a name='express'></a>
```javascript
// подключение express
const express = require("express");
// создаем объект приложения
const app = express();
// определяем обработчик для маршрута "/"
app.get("/", function(request, response){
     
    // отправляем ответ
    response.send("<h2>Привет Express!</h2>");
});
// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
```

## Маршрутизация

Когда фреймворк Express получает запрос, этот запрос передается в конвейер обработки. Конвейер состоит из набора компонентов или middleware, которые получают данные запроса и решают, как его обрабатывать. 

```app.use()``` - для встраивания в конвейер обработки запроса на любом этапе любую функцию middleware.  Функция, которая передается в **app.use()**, принимает три параметра: Функция, которая передается в **app.use()**, принимает три параметра:   
* ```request``` - данные запроса.  
* ```response``` - объект для управления ответом.  
* ```next``` -  следующая в конвейере обработки функция.

```javascript
const express = require("express");
 
const app = express();
app.use(function(request, response, next){
     
    console.log("Middleware 1");
    next();
});
app.use(function(request, response, next){
     
    console.log("Middleware 2");
    response.send("Middleware 2"); //так как происходит отправка, то 'Route /' не выведется
});
 
app.get("/", function(request, response){
    console.log("Route /");
    response.send("Hello");
});
app.listen(3000);
```
Функции middleware также могут сопоставляться с определенными маршрутами. 
```javascript
app.use("/about", function(request, response, next) { });
```

## Отправка ответа
```send()``` - отправка объекта. В качестве параметра эта функция может принимать объект Buffer, строку, в том числе с html-кодом, объект javascript или массив.
```javascript
const express = require("express");
const app = express();
 
app.use(function (request, response) {
    response.send("<h2>Hello</h2>");
   // response.send({id:6, name: "Tom"});
   // response.send(["Tom", "Bob", "Sam"]);
   // response.send(Buffer.from("Hello Express"));
});
 
app.listen(3000)
```

```sendFile()``` - отправка файлов. Необходимо передавать абсолютный путь к файлу, например, с помощью ```__dirname``` получить абсолютный путь к текущему проекту и добавить к нему путь к файлу в рамках текущего проекта.

```sendStatus()``` - отправляет пользователю определенный статусный код с некоторым сообщением по умолчанию. 

```response.json()``` - серилизует данные в JSON и отправляет.

```javascript
const express = require("express");
const app = express();
 
app.use("/home/foo/bar",function (request, response) {
  response.status(404).send(`Ресурс не найден`);
});
 
app.listen(3000);
```

```express.static()``` - используется для работы со стачискими файлами. Чтобы встроить компонент express.static в процесс обработки запроса, вызывается функция app.use(). Эта функция позволяет добавлять различные компоненты, которые еще называются middleware, в конвейер обработки запроса:
```javascript
app.use(express.static(__dirname + "/public"));
```

**express.static()** в данном случае мы напрямую обращаемся к статическим файлам, а функция **sendFile** фактически берет содержимое из файла и отсылает его пользователю.

В приложении определяются маршруты, а также обработчики этих маршрутов. Если запрос соответствует определенному маршруту, то вызывается для обработки запроса соответствующий обработчик. При определении функции для обработки того или иного машрута следует учитывать, что более общие маршруты должны идти после более частных. Для обработки данных по определенному маршруту можно использовать ряд функций, в частности: use, get, post, put, delete.

Используемые шаблоны адресов могут содержать регулярные выражения или специальные символы подстановок. В частности, мы можем использовать такие символы, как **?, +, * и ()**.

```javascript
app.get(/.*(\.)html$/, function (request, response) { // все .html файлы
    response.send(request.url)
});
```
## Переадрисация
```redirect()``` - используется для переадресации. В качестве параметра **path** передается путь, на который будет перенаправляться пользователь. Дополнительный параметр **status** задает статусный код переадресации.
```javascript
redirect([status,] path);
```
Переадрисацию можно производить как по относительным, так и по абсолютным путям.
```javascript
const express = require("express");
const app = express();
 
app.use("/home",function (request, response) {
  response.redirect("about")
});
app.use("/about", function (request, response) {
  response.send("<h1>About</h1>");
});
 
app.listen(3000);
```

Если необходимо выполнить переадресацию не относительно текущего ресурса ("about"), а относительно корневого каталога приложения, то в начале адреса ставится слеш ("/about"). На уровень выше ("."), на два ("..").

По умолчанию при редиректе передается статусный код **302**, который указывает, что ресурс временно доступен по новому адресу. Но можно указать статусный код **301**, чтобы сделать переадресацию постоянной.

## Передача параметров
В **express** можно получить параметра строки запроса через свойство **query** объекта **request**, который передается в функцию обработки запроса.
```javascript
const express = require("express");
// http://localhost:3000/about?id=3&name=Tome  
const app = express();
app.get("/", function(request, response) {
    response.send("<h1>Главная страница</h1>");
});

app.use("/about", function(request, response) {      
    let id = request.query.id;
    let userName = request.query.name;
    response.send("<h1>Информация</h1><p>id=" + id +"</p><p>name=" + userName + "</p>");
});
 
app.listen(3000);
```

## POST-запросы
Прежде всего для получения отправленных данных необходимо создать парсер.  
```urlencoded()``` - создание парсера. Принимает объект с параметрами парсинга. Значение **extended: false** указывает, что объект - результат парсинга будет представлять набор пар ключ-значение, а каждое значение может быть представлено в виде строки или массива.
```javascript
const urlencodedParser = bodyParser.urlencoded({extended: false});
```
```javascript
app.post("/register", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body); // получение данных
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});
```
Название параметра должно включать символы из диапазона [A-Za-z0-9_]. В определении маршрута параметры предваряются знаком двоеточия. Через коллекцию ```request.params``` можно получить все параметры.
```javascript
const express = require("express");
const app = express();
 
app.get("/products/:productId", function (request, response) { // products/apple
  response.send("productId: " + request.params["productId"]);   // apple
});
 
app.listen(3000);
```

## Router
Помогает определить дочерние маршурты относительно главного и добавить им обработчики.
```javascript
// определяем Router
const productRouter = express.Router();

// определяем маршруты и их обработчики внутри роутера
productRouter.use("/create", function(request, response){ ... });
productRouter.use("/:id", function(request, response){ ... });
// ...

// сопотавляем роутер с конечной точкой "/products"
app.use("/products", productRouter);
```


[^ Вверх](#home)
# Шаблоны <a name='templates'></a>
## Handlebars (hbs)
```npm install hbs --save```
Установить Handlebars  в качестве движка представлений Express:  
```javascript
app.set("view engine", "hbs");
```
```
app.set("views", "templates"); // установка пути к представлениям
```

```response.render()``` - рендерит представление, т.е. на основе представления создается страница .html, которая отправляется пользователю.

В шаблоне:  
```{{#if emailsVisible}} и {{/if}}``` - условное выражение. 
Цикл:   
```
{{#each emails}}
    <li>{{this}}</li>
{{/each}}
```
Для настройки функционала частичных представлений в коде используется вызов:
```javascript
const express = require("express");
hbs.registerPartials(__dirname + "/views/partials");
```
Добавление шаблона, при этом должен существовать footer.hbs:
```
  {{> footer}}
```
Для задания шаблона для всех страниц необходимо установить модуль **express-handlebars**:
```
npm install express-handlebars
```
```
 {{{body}}} // вместо этого выражения будет подставляться конкретное содержимое
```
Установление настроек для файлов layout(if,kjyjd):
```javascript
const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();

app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts",  //настройка папки с шаблоном с файлами layout
        defaultLayout: "layout", // указывает название файла с шаблоном
        extname: "hbs" // расширение файла-шаблона
    }
))
```
Хелперы фактически представляют функции, которые возвращают некоторую строку. После получения эту строку можно добавить в любое место представления. Строка может представлять собой в том числе и код html.
```javascript
hbs.registerHelper("getTime", function() {
    ... // необходимо возвращать строку
});
```
Использование: ```{{getTime}}```.
```
{{createStringList fruit}} // где fruit - массив, т.е. в обработчик передается массив
```

## EJS
```
npm install ejs --save
```
Регистрация:
```javascript
app.set("view engine", "ejs");
```
Использование:  
**<% выражение %>**, **<%= выражение %>**  
EJS позволяет вставлять код одних представлений в другие с помощью функции **include**.  
```
<%- include("partials/menu.ejs") %>
```

## Pug
```
npm install pug --save
```
Для работы с переданными данными внутри html-элементов применяются теги **#{выражение}**

Регистрация:  
```
app.set("view engine", "pug");
```
Подключение частичных представлений:  
```
include footer.pug
```
Для подключения шаблона-страницы в представление применяется директива extends, после которой указывается путь к файлу.  
```
extends layout.pug
```
С помощью директивы block определяет блок, в который будет вставляться некоторое содержимое. 
```
block content
```



[^ Вверх](#home) 
# Таймеры <a name='timers'></a>
Модуль: **Timer** <a name='module-timer'></a>.  



[^ Вверх](#home) 
# MongoDB <a name='mongo'></a>
```
npm install --save mongodb
```
При создании объекта **MongoClient** в конструктор передается два параметра, адрес сервера, где в качестве протокола ставиться ```mongodb://```, порт по умолчанию - 27017, второй - объект конфигурации.

```javascript
const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
// создание объекта MongoClient и передача ему строку подключения
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
// подключение к серверу
mongoClient.connect(function(err, client){
    // подключение к БД  
    const db = client.db("usersdb");
    // получение коллекции
    const collection = db.collection("users");
    let user = {name: "Tom", age: 23};
    collection.insertOne(user, function(err, result){
        if(err){ 
            return console.log(err);
        }
        console.log(result.ops);
        client.close(); // закрытие соединения
    });
});
```
Методы:  
**connect(callback(err, client) {...})** - устанавливает подключение к серверу, принимает коллбек, который вызывается после установки соединения, с двумя параметрами: ошибка, возникшая при установке соединения, ссылка на клиент, который подключен к серверу.    
**client.close()** - закрытие соединения.  
**client.db(nameDB)** - подключение к базе данных, передается название БД. Если БД не существует, то при первом обращении БД с таким названием будет создана.   
**db.collection("nameCollection")** - получение коллекции, передается название коллекции. 

*Добавление:*  
**collection.insertOne(data, function(err, result) {...})** - добавление документа, принимает два параметра: добавляемый объект и функция обратного вызова, которая вызывается после добавления данных (принимает ошибку и добавленный объект).  
**collection.insertMany(data, function(err, result) {...})** - добавление набора объектов (массив объектов), принимает два параметра: добавляемые объекты и функция обратного вызова, которая вызывается после добавления данных (принимает ошибку и добавленные данные).  

*Получение:*  
**collection.find(filter)** - получение данных из коллекции, возвращает специальный объект - Cursor, и чтобы получить все данные у этого объекта вызывается метод ```toArray()```, в который передается функция обратного вызова с параметрами ошибки и результата выборки (```collection.find().toArray(function(err, results){ ... })```). filter - объект фильтрации (например, ```{name: "Tom", age: 23}```).  
**collection.findOne(filter, function(err, doc){ ... })** - аналогичен методу ```find()```, но используется для получения одного документа.  

*Удаление:*  
**collection.deleteMany(filter, function(err, result){ ... })** - удаляет все документы, которые соответствуют определенному критерию.  
**collection.deleteOne(filter, function(err, doc){ ... })** - удаляет один документ, который соответствует определенному критерию.  
**collection.findOneAndDelete(filter, function(err, doc){ ... })** - получает и удаляет один документ, который соответствует определенному критерию, при этом возвращает удаленный документ   
**collection.drop(function(err, result){ ... })** - удаляет всю коллекцию.  

*Обновление:*  
**collection.updateOne()** - обновляет один документ, который соответствует критерию фильтрации, и возвращает информацию об операции обновления.
**collection.updateMany()** - обновляет все документы, которые соответствуют критерию фильтрации, и возвращает информацию об операции обновления, параметры аналогичные ```findOneAndUpdate()```.  
**collection.findOneAndUpdate()** - обновляет один документ, который соответствует критерию фильтрации, и возвращает обновленный документ, принимает следующие параметры: фильтр, параметр обновления, дополнительные опции обновления (по умлочанию null) и функция обратного вызова. В параметрах обновления применяется объект ```{ $set: {age: 25}}```. Параметр **$set** позволяет обновить значения для одного поля или группы полей. Например, 
```
col.findOneAndUpdate({age: 21}, // критерий выборки
            { $set: {age: 25}}, // параметр обновления
            {returnOriginal: false}, // доп. опции обновления, получить обновленное значение, а не старое
            function(err, result){ ... });
```

## Mongoose <a name='mongoose'></a>
```
npm install mongoose --save
```

```javascript
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  
// установка схемы
const userScheme = new Schema({
    name: String,
    age: Number
});
  
// подключение
mongoose.connect("mongodb://localhost:27017/usersdb", { useNewUrlParser: true });

// определение модели, в БД будет искаться название во множественном числе, т.е.
// user + s = users
const User = mongoose.model("User", userScheme);

// создается объект модели
const user = new User({
    name: "Bill",
    age: 41
});
  
// сохраняет объект модели в БД, save возвращает промис, в then можно получить данные,
// которые вернул сервер
user.save(function(err){
    mongoose.disconnect();  // отключение от базы данных
      
    if(err) return console.log(err);
    console.log("Сохранен объект", user);
});
```

В схеме в типах данных можно указать:
String, Number, Date, Buffer, Boolean, Mixed, Objectid, Array, Decimal128, Map  
Если свойство представляет сложный объект, то в качестве типа указывается определение этого объекта, например, массив строк ```[String]```.  
С помощью параметра **default** можно указать значение по умолчанию для свойства.  
```javascript
const userScheme = new Schema({
    name: {
        type: String,
        default: "NoName"
    }
});
```
Mongoose имеет ряд встроенных правил валидации, которые можно указать в схеме:  
**required** - требует обязательного наличия значения для свойства.  
**min** и **max** - задают минимальное и максимальное значения для числовых данных.  
**minlength** и **maxlength** - задают минимальную и максимальную длину для строк.  
**enum** - строка должна представлять одно из значений в указанном массиве строк.  
**match** - строка должна соответствовать регулярному выражению.  

По умолчанию при сохранении данных Mongoose добавляет специальное поле **__v**, которое указывает на версию документа, его можно отключить, добавив в схему объект ```{ versionKey: false }```.  

*Создание документа:*  
**Model.create(data, function(err, doc) { ... })** - сохранение данных, принимает два параметра: данные для сохранения и функцию обратного вызова (с параметрами ошибки и сохраненного документа).  

*Получение данных:*  
**Model.find(filter, function(err, docs) { ... })** - возвращает все объекты, которые соответствуют критерию фильтрации. Если в качестве критерия фильтрации передаются пустые фигурные скобки ({}), то возвращаются все объекты.    
**Model.findById(id, function(err, doc){ ... })** - возвращает один объект по значению поля _id.  
**Model.findOne(filter, function(err, doc) { ... })** - возвращает один объект, который соответствует критерию фильтрации.  

*Удаление данных:*  
**Model.remove(filter, function(err, doc) { ... })** - удаляет все объекты, удовлетворяющие услвию фильтрации.  
**Model.findOneAndDelete(filter, function(err, doc) { ... })** - удаляет один объект.  
**Model.findByIdAndDelete(id, function(err, doc){ ... })** - удаляет объект по id.  

*Изменение данных:*  
**Model.updateOne(filter, newData, function(err, doc) { ... })** - обновляет один документ, принимает три документа: фильтр, обновляющие данные, функция обратного вызова.  
**Model.updateMany(filter, newData, function(err, docы) { ... })** - обновляет документы, удовлетворяющие условию, принимает три параметра: фильтр, обновляющие данные, функция обратного вызова.  
**Model.findByIdAndUpdate(id, newData, options, function(err, docы) { ... })** - находит обновляемый объект по id, принимает четыре параметра: id документа, обновляющие данные, опции(если необходиы в коллбеке новые данные, то надо здесь передать ```{new: true}```), функция обратного вызова.  


[^ Вверх](#home) 
# Сокеты <a name='socket'></a>
```
npm install socket.io --save
```
На клиентской стороне используется **socket.io-client**. Экземпляру передается адес сервера, с которым необходимо установить соединение.

События:  
**connection** - генерируется при установке соединения между клиентом и сервером. Каждое соединение имеет онкретный идентификатор, с помощью которого можно определить конкретного клиента.  
**disconnect** - генерируется при разрыве соединения, которое разрывается при закрытии вкладки или после вызова метода ```disconnect()``` сокета.  

Методы:  
**on( event, callback )** - добавляется обработчик события.  
**emit( event, data, callback )** - используется для отправки данных **клиент <=> сервер**. Параметры: имя события, данные для отправки, коллбек, которые вызывается, когда вторая сторона получит сообщение.  
**clients()** - узнать количество соединений.  
**join( roomName )** - в пределах пространства распределяет сокеты по "комнатам".   
**leave()** - вынесение сокета из "команаты".  
**to()** - отправка данных в "комнату".  
**in()** - используется для обработки событий, инициируемых в пределах комнаты. 

```javascript
// получатель
let socket = io()

socket.on('message', message => console.log('Message from server: ', message))

// отправитель
io.on('connection', socket => {
  socket.emit('message', "I'm server")
});

// пространство имен
const nmspc1 = io.of('/your-namespace1');
let socket = io('/your-namespace1'); // на клиенте

// присоединение к "комнате"
io.on('connection', socket => {
  socket.join('Room №1')
});

// отправка данных в "комнату"
io.to('Room №1').emit('message', 'Message form Room №1')

// обработка событий в "комнате"
io.in('Room №1').on('message', message => console.log('Room №1. Message: ', message));
```

[^ Вверх](#home) 
# Flash-сообщения <a name='flash'></a>
это сообщения, которые сохраняются в сессии и доступны в обработчике маршрута, на который выполняется следующий переход, удаляется из сессии после того, как оно было отображено в представлении.
```
npm install connect-flash cookie-parser express-session --save
```
**flash(key [,text])** - если передан ключ и текст, то сообщение устанавливается, если только ключ, то функция возвращает сообщение.
```javascript
req.flash('message', { from: 'Me', to: 'You' }); // установка
console.log('Flash: ', req.flash('message')); // получение
```



[^ Вверх](#home) 
# Аутентификация <a name='auth'></a>
Чаще всего реализуется с помощью библиотеки <a href='http://www.passportjs.org/docs/'>passport.js</a>.
```
npm install passport --save
```

Методы:  
**initialize()** - инициализация библиотеки.  
**session()** - установка сессии.  
**authenticate(strategy, options)** - первым параметром передается стратегия аутентификации (```local``` - в пределах приложения по логину и паролю), вторым параметром передается объект конфигурации  
(```successRedirect``` - URL для перехода в случае успешной аутентификации;  
```failureRedirect``` - URL для перехода в случае ошибки;  
```failureFlash``` - булевое значение, если true, то добавит flash-сообщение, переданное методу done() в случае ошибки. ) 
```javascript
passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}));
```

```javascript
passport.use(
  new localStrategy(
    {
      usernameField: 'login', // изменяем поля логина и пароля при запросе, по умолчанию username и password
      passwordField: 'pwd'
    },
    (user, password, done) => {
        if (user !== 'test_user') 
            return done(null, false, { message: 'User not found' }) // message устанавливается в flash-сообщении
        else if (password !== 'test_password') 
            return done(null, false, { message: 'Wrong password' })

        return done(null, { id: 1, name: 'Test', age: 21 }); // удачно
    }
  )
);
```
 В случае успешной аутентификации в объекте запроса в свойстве **user** сохраняются переданные данные пользователя. 

 ```javascript
 // Функции промежуточной обработки для записи/чтения пользователя, необходимы только в том случае, 
 // если используется app.use(passport.session()).
passport.serializeUser((user, done) => done(null, user)); 
passport.deserializeUser((user, done) => done(null, user)); 
 ```
## Google <a name='google-auth'></a>
Модуль поддерживает протоколы OAuth 1.0 и OAuth 2.0.
```
npm install passport-google-oauth --save
```
Стратегии аутентификации GoogleStrategy передаются два параметра:  
* объект с параметрами вашего аккаунта Google (GOOGLE_CLIENT_ID и GOOGLE_CLIENT_SECRET) и указанием маршрута, к которому нужно обратиться после процесса аутентификации;  
* функция, описывающая логику аутентификации и устанавливающая конечный результат; принимает следующие параметры:
    * accessToken;
    * refreshToken;
    * profile - данные профиля пользователя из аккаунта Google;
    * done - функция, с помощью которой задается результат аутентификации (после ее вызова происходит переход на указанный в callbackURL маршрут).
```javascript
passport.use(
  new GoogleStrategy(
    {
      clientID: 90876745, //YOUR GOOGLE_CLIENT_ID
      clientSecret: '35revr-sdv6-3tswa-vzd', //YOUR GOOGLE_CLIENT_SECRET
      callbackURL: 'http://www.yourdomain.com/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
);
```
```javascript
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/home'
  })
);
```
## Facebook <a name='facebook-auth'></a>
```
npm install passport-facebook --save
```
```javascript
passport.use(new FacebookStrategy({
    clientID: 90876745, //YOUR FACEBOOK_APP_ID
    clientSecret: '35revr-sdv6-3tswa-vzd', //YOUR FACEBOOK_APP_SECRET
    callbackURL: "http://www.yourdomain.com/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    })
);
```
```javascript
app.get('/auth/facebook, passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate(facebook, {
    failureRedirect: '/login',
    successRedirect: '/home'
}));
```

[^ Вверх](#home) 
# Архитектура <a name='architect'></a>



[^ Вверх](#home)  
# TypeScript < a name='typescript'></a>
Установка:
```
npm install -g typescript
```
Проверить версию:
```
tsc --version
```
Сначала необходимо скомпилировать .ts файлы, потом запускать index.js  
Минимальная настройка **tsconfig.json**, можно создать вручную или сгенерировать(```tsc --init```):  
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "ES6",
        "noImplicitAny": true,
        "removeComments": true,
        "outDir": "bin/", // компилирует в папку bin
        "sourceMap": false
    }
}
```
Установка типизации зависимостей:  
```
npm install --save-dev @types/node @types/express @types/express-session @types/body-parser @types/nedb
```
В **package.json** настройка команд:
```
"scripts": {
    "start": "tsc --watch",
    "built:watch": "nodemon ./bin/index.js"
  }
```
В **package.json** и **main** указать точку входа "bin/index.js"/




