#GIT

1. [Убрать папку из индекса](#remove-index-folder)
2. [Разница между двумя ветками](#diff-branches)

## [Ошибки](#errors)

## Убрать папку из индекса <a name="remove-index-folder"></a>
* git rm -r --cached --ignore-unmatch folder_name
* git rm --cached readme.txt

 ## Разница между двумя ветками <a name="diff-branches"></a>


## Ошибки <a name="errors"></a>
## fatal: LF would be replaced by CRLF in ...
У добавляемых файлов переносы строк в Unix-формате. Самое простое, что можно сделать — отключить проверку формата в настройках git, установленного в систему:
* git config --global core.autocrlf false
* git config --global core.safecrlf false