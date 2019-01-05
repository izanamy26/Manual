<h2>ES2015</h2>

* Проверка установки npm  
npm -v

* Установка Babel  
npm i babel-cli babel-core babel-preset-env --save-dev

* В package.json добавляем команду для транспиляции  
```html
"scripts" : {  
 "watch" : "babel app/js -d app/dist --presets env -w"  
}

* Запуск слежения за файлом  
npm run watch