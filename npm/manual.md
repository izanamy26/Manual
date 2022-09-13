<a name='top'></a>

<a href='https://docs.npmjs.com'>NPM</a> - менеджер пакетов.

* [Обновить npm](#npm-update)
* [npm init](#init)
* [npm install](#install)
* [Ошибки](#errors)

**package.json** - описание модулей.


## Обновить npm
```
npm install npm@latest -g
```
```
npm update npm -g
```

[^Вверх](#top)
## npm init <a name='init'></a>
Создает **package.json** или если он существует, устанавлиевает модули, указанные в нем.  
```
npm init [--force|-f|--yes|-y|--scope]
``` 
**-y** - генерация без вопросов;

## npm install <a name='install'></a>
Установка пакетов из **package.json**.
```
```
* **-g | --global** - установить пакет глобально;  
* **--production** - не устанавливает пакеты из опции **devDependences** для продовского окружения (NODE_ENV === production), только из **dependences**. Чтобы установить все пакеты необходимо использовать **--production=false**.  

Установка из папки:  
```
npm install <folder>
```

Установка из архива (.tar, .tar.gz, .tgz):  
```
npm install <tarball file>      // npm install ./package.tgz
```

Установка из архива по ссылке:  
```
npm install <tarball url>
```

Просмотр списка установленных пакетов:
```
npm list --depth=0
```

[^Вверх](#top)
## Ошибки<a name='errors'></a>
Если версия **npm** больше 7, могут не ставится пакеты, тогда можно попробовать использовать флаг ```--legacy-peer-deps```.