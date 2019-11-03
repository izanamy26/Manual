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


[^ Вверх](#home)  
# Передача параметров приложению < a name='argv'></a>
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
