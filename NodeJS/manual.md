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






<style>
  .spoiler {
    display: none;
  }

  .source:hover .spoiler {
    display: block;
  }
</style>