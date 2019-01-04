#GIT

###Убрать папку из индекса
* git rm -r --cached --ignore-unmatch folder_name

* git rm --cached readme.txt

### Ошибка: fatal: LF would be replaced by CRLF in ...
У добавляемых файлов переносы строк в Unix-формате. Самое простое, что можно сделать — отключить проверку формата в настройках git, установленного в систему:
* git config --global core.autocrlf false
* git config --global core.safecrlf false