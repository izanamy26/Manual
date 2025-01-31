# <a name='home'></a>

[Архитектура микрофронтенда](#arch)  
[Стратегии проектирования микрофронтендов](#strategy)  
[Варианты реализации микрофронтендов](#variants)  
[Инструменты для создания микрофронтендов](#tools)
[Как управлять состоянием и связью между микрофронтендами](#manage)
[Паттерн Strangler Fig](#fig)  
[Anti-Corruption Layer (ACL) и маршрутизация](#rider)  
[Микросервисы и процесс взаимодействия](#process)  
[Паттерн Saga](#saga)

## Зачем переходить на микрофронтенд

> Монолит - единая база кода. в которой объеденены все бизнес-задачи.

> Микрофроонтенд - концепция, которая распространяет принципы микросервисной архитектуры на мир фронтенда. Не только техническое, но и стратегическое решение, которое влияет на тсруктуру команд и их взаимодействие.

### Преримущества микрофронтенда:

- **Организационная гибкость.** Различные команды могут работать параллельно.
- **Выбор нескольких различных технологических стеков.**
- **Упрощение управления кодом.** Каждая команда управляет только тем кодом, который относится к ее функциональности. Обновление не вызывает непредвиденных последствий в других частях приложения. Ускоряет онбординг, так как нужно изучить меньше кода.
- **Более управляемое масштабирование.** Команды могут масштабировать свои сервисы в зависимости от спроса на конкретные функции. Масшиабировать все приложение теперь не обязательно.
- **Повышение отказоустойчивости.** При отказе одного микрофронтенда пострадает один сегмент приложения. Так же проще откатывать изменения к стабильному состоянию в случае ошибок.
- **Ускорение времени выхода на рынок.**

### Архитектура микрофронтенда <a name='arch'></a>

- **Модули микрофронтенда.** Модуль - определенная бизнес-область или функциональность. Независимы друг от друга.
- **Слой композиции.** Отвечает за сборку различных модулей в целостное приложение, а также управляет потоком данных и взаимодействием между клиентом и сервером. Компоновка может происходить на стороне сервера, клиента или с помощью гибридного подхода.
- **Маршрутизация.** Запросы должны направляться к соответствующему микрофронтенду. Это поможет сохранить модульность приложения.
- **Коммуникационный слой.** Этот слой управляет взаимодействием между микрофронтендами и остальной инфраструктурой приложения. Реализовать коммуникацию можно через API, шины событий или собственные системы событий.

## Стратегии проектирования микрофронтендов <a name='strategy'></a>

### Вертикальная нарезка

<image src="images/verticals.png" />

Стратегия основана на предметно-ориентированном проектировании (Domain-Driven Design, DDD). Этот подход предполагает, что приложение делят на домены (domain) — это предметные области, которые описывают разные цели бизнеса.

Стратегия вертикальной нарезки предполагает организацию микрофронтендов таким образом, чтобы каждый из них соответствовал отдельной бизнес-функции или клиентскому пути, обеспечивая независимость и автономность в разработке и тестировании.

Когда использовать: сложные пользовательские системы, кросс-функциональные команды.

### Автономность команд

<image src="images/autonom.png" />

Разный технологический стек позволит использовать сильные стороны технологий, чтобы достичь максимальной производительности. Но может привести к трудностям в решении сквозных проблем.

Когда использовать: разные технологические потребности, проекты, ориентированные на инновации.

### Изоляция

<image src="images/izolate.png" />

Каждый микрофронтенд должен включать все свои зависимости. Их инкапсулирует в его пакет развертывания. Минусом может может быть увеличение размера приложения из-за дублирования изолированных зависимостей в кадом микрофронтенде.

Когда использовать: частые обновления и развертывания, задачи масштабирования.

## Варианты реализации микрофронтендов <a name='variants'></a>

**Build time** - объединять вов ремя сборки.  
Подойдет, если необходимо:

- упростить развертывание;
- оставить тесное взаимодейтсвие функци;
- оптимизировать производительность (наприме, необходимо использовать tree-shaking);

Минусы:

- сложно использовать разные технологии;
- необходимо синхронизировать разные версии бибилиотек, иначе возникнут проблемы со сборкой;
- конечный бандл получится большим;
- если появятся изменения в зависимостях, придется заново развертывать пакет;
- между контейнером и микрофронтендами будет тесная связь;

**Run time** - объединять во время выполнения.  
Подойдет, если необходимо:

- развертывать модули независимо;
- динамически обновлять отдельные модули (без развертывания всего приложения);
- сделать масштабирование гибким;

### Композиция микрофронтендов

- процесс сборки микрофронтендов в единое целое

- **серверная** - полезная для начальной загрузки страниц, SEO и упрощения логики на клиенте.  
  Используют обратный прокси-сервер Nginx, BFF.
- **клиентская** - браузер отвечает за динамическую загрузку каждого микрофронтенда. Использовать, если много интерактива на клиенте.  
  Используют Single SPA, Module Federation, lazy и Suspense из React или динамического импоорта во Vue и Angular, iframes или веб-компоненты (Web Compоnents).
- **гибридная** - при таком подходе каждый микрофронтенд имеет свой выделенный бекенд (BFF). BFF обрабатывает все данные, взаимодействует с API, при необходимости предоставляет клиенту отрендеренный HTML.
  После первоначальной загрузки работу начинает клиентская часть, фреймворки и библиотеки управляют обновлениями DOM, состоянием клиента и рендеринга на основе взаимодействия с клиентом.

## Инструменты для создания микрофронтендов <a name='tools'></a>

### Webpack Module Federation

Module Federation основан на функции lazy loading. Она позволяет приложению загружать фрагменты кода по требованию. Это сокращает время первоначальной загрузки и помогает оптимизировать использование ресурсов.

Module Federation объединяет разные модули приложения в единое целое и позволяет им использовать общий код. В такой композиции есть две роли — хост и удалённый модуль:

- **Хост (host)** — это основное приложение. Когда вы его запускаете, оно динамически загружает удалённые модули.
- **Удалённый модуль (remote)** — это отдельный микрофронтенд. Он предоставляет часть своей функциональности хосту или другим удалённым модулям.

Хост и удалённые модули могут использовать общие зависимости, хотя это разные сборки. Чтобы это получилось, Module Federation использует функцию shared dependencies. Она позволяет эффективно управлять версиями и гарантирует, что приложение загрузит одну версию библиотеки, если это возможно.

Чтобы создать микрофронтенды, нужно написать конфигурацию Module Federation для хоста и для каждого удалённого модуля:

- **name** — имя модуля.
- **filename** — имя файла. Это точка входа в микрофронтенд — код, который инициализирует необходимые объекты.
- **exposes** — компоненты, которые нужно передать от одного приложения другому.
- **shared** — зависимости, без которых сборка не будет работать. Например, мы работаем с React. Значит, используем в качестве общей библиотеки react.
- **remotes** — список подключаемых микрофронтендов. Его пишут только в конфигурации для хоста.

### Single SPA

Single SPA — это JavaScript-фреймворк. Он позволяет использовать несколько JavaScript-фреймворков на одной странице, не обновляя её целиком.  
Общий принцип:

- **Root (рут, корень)** — основное приложение, которое подгружает разные микрофронтенды.
- **Микрофронтенды**, которые подключают к руту.

**Root config**. Здесь настраивается Single SPA и указывается, как загружать разные микрофронтенды.  
Понадобятся два метода из библиотеки `single-spa`:
`registerApplication` — регистрирует микрофронтенды.  
`start` — запускает приложение.  
Чтобы зарегистрировать модуль, нужно указать такие параметры:

- **name** — имя модуля.
- **app** — метод, с помощью которого модуль нужно загрузить по сети.
- **activeWhen** — условие, по которому подгружать модуль.

## Как управлять состоянием и связью между микрофронтендами <a name='manage'></a>

Чтобы управлять состоянием и коммуникациями между микрофронтендами, можно использовать три стратегии:

- **Взаимодействие на основе API**  
  Микрофронтенды должны взаимодействовать с бэкендом, а не напрямую друг с другом.  
  Взаимодействие через API просто реализовать. Но эта стратегия не подойдёт, если нужно реактивно обновлять компоненты одного микрофронтенда в ответ на изменение данных в другом. Для этого придётся либо делать регулярные запросы к бэкенду или использовать технологии вроде Websocket. А это уже ближе к паттерну Pub/Sub.
- **Паттерн Pub/Sub**  
  Использовать нужно, если:
- Предпочтительно несвязанное взаимодействие между микрофронтендами;
- Архитектура, управляемая событиями (event-driven architecture, EDA);
- Микрофронтенды разворачиваются независимо;
- **Библиотека глобального состояния**
  Библиотека сама ходит в базу данных через API и обновляет данные на фронтенде. К библиотекам глобального состояния относятся Redux, MobX и Context API в React.  
  Использовать нужно, если:
- Тесная связь между частями микрофронденда;
- Важно поддерживать последовательный пользовательский опят;
- Сложные требования у управлению состоянием;

**Когда использовать BFF:**

- Монолитный фронтенд и микросервисы.
- Несколько клиентов, которые используют разные технологии.
- Микросервисы и микрофронтенды.

**Преимущеста BFF:**

- Подготовить данные для конкретного фронтенда.
- Упростить логику на стороне клиента.
- Увеличить производительность.
- Усилить безопасность.

**Что нужно учесть при дизайне BFF:**

- Подберить оптимальный технологический стек.
- Внедрить стратегии кэширования.
- Разработать систему обработки ошибок.
- Внедрить мониторинг и ведение логов.

## Паттерн Strangler Fig <a name='fig'></a>

**Антипаттерн «Большой взрыв»**
Миграцию монолита на микросервисы можно провести за один раз, сразу все.
<image src="images/big_bum.png" />

Паттерн Strangler Fig придумал Мартин Фаулер в начале 2000-х. Название паттерна отсылает к поведению фикусов-душителей (strangler figs).

Паттерн Strangler Fig предлагает итеративный подход к миграции.

У постепенной миграции четыре главных преимущества:

- Постепенная замена монолита.
- Снижение рисков и управление ими.
- Инкрементная доставка новых функций в процессе миграции.
- Эффективное решение проблемы технического долга.

<image src="images/fig.png" />

### Перенаправление трафика:

1. Маршрутизация на основе прокси.

- **Обратный прокси-сервер** можно использовать для маршрутизации запросов либо к монолиту, либо к новым микросервисам на основе определённых правил.
- **API-шлюз** реализуется для управления и маршрутизации трафика, обеспечивая единую точку входа для всех клиентских запросов.

2. Фича-тогглы.

- **Переключатели функций** нужны для управления развёртыванием новых функций, чтобы постепенно перенаправлять трафик на новые сервисы.

3. Канареечные релизы, или инкрементальное смещение трафика.

- **Канареечные релизы** постепенно переводят трафик на новые услуги, отслеживая производительность и стабильность перед полным развёртыванием.

### Метрики производительности

1. **Ключевые показатели эффективности (Key Performance Indicators, KPI).** К этим показателям относятся время отклика, частота ошибок, пропускная способность, количество запросов в секунду.  
   KPI определяют для каждого микросервиса и устанавливают пороговое значение уровня производительности. Затем эти показатели отслеживаются с помощью инструментов мониторинга.
2. **Цели уровня сервиса (Service-Level Objectives, SLO)** — это чётко определённые цели в области производительности и доступности сервиса.
   SLO ставятся на основе бизнес-требований, таких как время безотказной работы или время отклика. Затем соответствие SLO контролируют с помощью инструментов APM.
3. **Индикаторы уровня обслуживания (Service Level Indicator, SLI)** — это количественная оценка работы сервиса, показывающая, выполняются ли SLO. Эти индикаторы определяются для критических показателей и отслеживаются на соответствие с заданными SLO.  
   К SLI относятся, например, латентность — время, необходимое для обработки запроса, доступность — доля времени, в течение которого сервис работает, и частота ошибок.

### Средства мониторинга

1. **Мониторинг производительности приложений (Application Performance Monitoring, APM)**. Инструменты APM отслеживают производительность приложений и отдельных микросервисов в режиме реального времени, предоставляют информацию о времени отклика, количестве ошибок и взаимодействии с пользователями.  
   Примерами таких инструментов являются системы _New Relic, Datadog, Dynatrace_.
2. **Централизованное логирование**. Инструменты централизованного протоколирования объединяют журналы различных служб в одном месте, что упрощает поиск, анализ и устранение проблем.  
   К таким относятся системы _ELK Stack (Elasticsearch, Logstash, Kibana), Splunk, Fluentd_.
3. **Мониторинг инфраструктуры**. Эти инструменты следят за состоянием и производительностью базовой инфраструктуры, такой как серверы, контейнеры и сетевые компоненты. Благодаря им отслеживается загрузка процессора, потребление памяти, дисковые операции ввода-вывода и сетевая задержка.
   Это, например, системы _Prometheus, Grafana, Nagios_.

**Domain-Driven Design (DDD)** — методология разработки ПО, основанная на тесном взаимодействии бизнеса и разработчиков. Основной принцип этой техники — разделение приложения на домены, которые представляют собой ограниченный контекст бизнес-проблем и целей.

### Методы расстановки приоритетов

**MoSCoW**  
Метод приоритизации MoSCoW разделяет требования на четыре категории: Must have (обязательно), Should have (нужно), Could have (желательно) и Won't have (можно перенести).

_Когда использовать метод MoSCoW эффективно?_

- У проекта есть чётко определённые бизнес-цели, и необходимо тесно увязать технические задачи с приоритетами бизнеса. Метод MoSCoW помогает убедиться, что наиболее важные бизнес-функции будут рассмотрены в первую очередь.
- Когда в процесс вовлечено множество заинтересованных сторон и их согласие крайне важно. Метод MoSCoW способствует обсуждению того, что необходимо (Must have), а что может быть отложено (Should have, Could have).
- При управлении ограниченными ресурсами (время, бюджет, персонал) и необходимости расставлять приоритеты в задачах, чтобы наилучшим образом использовать имеющиеся ресурсы.

**Матрица Эйзенхауэра**
Матрица Эйзенхауэра — это инструмент управления временем, который помогает расставить приоритеты задач, разделяя их на четыре категории: срочные и важные, важные, но не срочные, срочные, но не важные, не срочные и не важные.

## Anti-Corruption Layer (ACL) и маршрутизация <a name='rider'></a>

**Anti-Corruption Layer (ACL)** — это паттерн проектирования, который помогает создать границу между новой системой и унаследованной. Через этот уровень проходят все данные, которые системы передают друг другу. ACL знает их форматы и модели данных. Он адаптирует информацию под требования получателя.

Чтобы создать Anti-Corruption Layer, используют несколько популярных паттернов проектирования. Обычно это Facade и Adapter. Эти паттерны используют для сопоставления API монолитных систем с типами и интерфейсами, которые являются частью микросервисов.

Этот уровень:

- Изолирует микросервисы от сложностей и проблем унаследованной системы.
- Управляет маршрутизацией запросов между монолитом и микросервисами.
- Адаптирует данные под требования разных систем.
- Инкапсулирует монолитную систему.

Алгоритм:

1. Микросервису нужна информация от монолитной системы. Он посылает запрос на ACL.
2. ACL передаёт запрос адаптеру, чтобы он перевёл запрос микросервиса в формат и семантику монолитной системы.
3. Адаптер переводит запрос и отправляет его монолитной системе.
4. Монолитная система обрабатывает запрос и отправляет ответ адаптеру.
5. Адаптер переводит ответ в формат и семантику микросервиса, а затем передаёт запрос ACL.
6. ACL отправляет переведённые данные микросервису.

<image src="images/acl.png" />

Пример архитектуры с ACL:
<image src="images/acl_example.png" />

**ACL-компоненты:**

- _Адаптеры данных_ — они преобразуют форматы данных и обеспечивают совместимость унаследованной системы и новой.
- _Шлюзы сервисов_ — они нужны для управления взаимодействием между старой системой и новыми сервисами. Шлюзы занимаются преобразованием протоколов, маршрутизацией запросов и преобразованием ответов.

<image src="images/acl_build.png" />

### Технологии и инструменты для создания ACL

- **API-шлюзы**. Kong, NGINX и AWS API Gateway можно использовать для управления и маршрутизации запросов между старой системой и микросервисами.
- **Инструменты для преобразования данных**. Такие технологии, как Apache Camel и MuleSoft, упростят трансформацию данных и преобразование протоколов.
- **Брокеры сообщений**. Брокеры сообщений обеспечивают связь и обмен данными между старой системой и новыми сервисами. Например, можно использовать RabbitMQ, Apache Kafka или AWS SQS.
- **Service Mesh**. Решения Service Mesh, такие как Istio и Linkerd, могут предоставить дополнительные возможности для управления взаимодействиями микросервисов. В том числе — управление трафиком, безопасность и наблюдаемость.
- **Настраиваемое промежуточное ПО**. Можно самостоятельно разработать пользовательское промежуточное ПО с использованием языков программирования и фреймворков. Например, использовать Java с Spring Boot и Node.js. Такой вариант поможет обеспечить индивидуальные решения для конкретных требований ACL.

**Маршрутизация** — это способы управления и направления потока трафика между различными частями системы.

### Техники маршрутизации между монолитом и новыми сервисами

- **обратный прокси-сервер (reverse proxy)** — это промежуточный сервер, который ретранслирует запросы клиентов из внешней сети на один или несколько серверов внутренней сети. При миграции из монолита в микросервисы обратный прокси может направлять трафик на монолит или микросервисы.

Чаще всего обратный прокси реализуют с помощью Nginx, HAProxy или Apache HTTP Server.

Преимущества:

- упращенная маршрутизация;
- балансировка нагрузки;
- безопасность;
- кеширование.

- **API-шлюз (Gateway API)** — это продвинутая и многофункциональная альтернатива обратному прокси-серверу. Когда шлюз развёртывают, он начинает обрабатывать все входящие запросы и перенаправлять их на основе заранее определённых правил. Ещё можно определить конфигурацию шлюза. Тогда можно управлять эндпоинтами, применять политики безопасности и преобразовывать запросы или ответы.

К популярным API-шлюзам относятся Kong, Apigee, AWS API Gateway и Zuul.

Преимущества:

- унифицированная точка входа;
- безопасность и аутентификация;
- ограничение скорости и дробление;
- аналитика и мониторинг.

- **Service Mesh** — это выделенный инфраструктурный уровень для обработки взаимодействия между сервисами в архитектуре микросервисов. Он обеспечивает расширенную маршрутизацию, управление трафиком и возможности наблюдения. Service Mesh предполагает, что рядом с каждым экземпляром микросервиса развёртывается прокси-сервер Sidecar. Он управляет всеми сетевыми соединениями с микросервисом — координирует запросы к нему и от него.

Есть разные Sidecar-прокси. Например, Envoy и Linkerd. Их развёртывают в рамках одного пода или контейнера. Затем конфигурируют для обработки маршрутизации, балансировки нагрузки, повторных попыток и других сетевых проблем.

## Микросервисы и процесс взаимодействия <a name='process'></a>

<image src="images/14_printsipov.png" />

1. **Границы сервисов**. Идентификация бизнес-доменов и субдоменов, обеспечение того, чтобы сервисы инкапсулировали конкретные бизнес-функции.

2. **Методы взаимодействия**. Использование синхронных (REST, RPC) для обеспечения низких задержек и быстрого отклика; использование асинхронных (системы обмена сообщениями, управляемые событиями) для развязки и масштабируемости.

3. **Управление данными**. Внедрение SAGA, использование источников событий для обеспечения согласованности в конечном итоге, обеспечение надёжной согласованности для критических операций, разделение данных для масштабируемости.

4. **Стратегии развёртывания**. Использование контейнеров (Docker), инструментов оркестрации (Kubernetes) для управления развёртыванием, обеспечение независимого развёртывания и масштабирования сервисов.

   - _Контейнеризация_ — это облегчённая форма виртуализации, которая предполагает инкапсуляцию приложения и его зависимостей в самодостаточную единицу, называемую контейнером.
   - _Сине-зелёные релизы (Blue-Green)_ - при сине-зелёном релизе поддерживаются два идентичных окружения (синее и зелёное). Пока одно (например, синее) работает и обслуживает продакшн, другое (например, зелёное) используется для развёртывания и тестирования новой версии. Затем, когда новая версия прошла тестирование в зелёном окружении, трафик переключается на него. Синяя среда теперь простаивает и может быть использована для следующего обновления.
   - _Канареечные релизы (Canary)_ - при канареечном способе обновления новая версия разворачивается на каком-то количестве серверов (канареечные серверы). Туда направляют небольшой процент трафика. Развёртывание отслеживают на предмет ошибок и, если проблем не обнаружено, туда направляют всё больше трафика. В конце концов новая версия разворачивается на всех серверах.
   - _Скользящие релизы (Rolling)_ - при скользящем релизе экземпляры приложения постепенно обновляются по одному или небольшими партиями без простоев. Такой подход обеспечивает постоянное обслуживание трафика одними экземплярами, в то время как другие находятся в процессе обновления.

5. **Балансировка нагрузки**. Использование соответствующих стратегий балансировки нагрузки на основе характеристик сервиса, мониторинг производительности для корректировки конфигурации балансировки нагрузки.

Стратегии балансировки:

- _Round Robin_. Равномерно последовательно распределяет нагрузку между всеми экземплярами. Стратегия проста и эффективна для систем, где все экземпляры имеют схожие характеристики мощности и производительности.
- _Least Connection_. Эта стратегия направляет запросы к экземпляру с наименьшим количеством активных соединений. Она помогает распределить нагрузку более равномерно, особенно когда есть экземпляры с разной производительностью. Применяется в системах, где экземпляры могут обрабатывать запросы разной сложности и продолжительности.
- _IP Hash_. Эта стратегия использует хэш IP-адреса клиента, чтобы определить, какой экземпляр будет обрабатывать запрос. Это гарантирует, что запросы от одного и того же клиента будут последовательно направляться к одному и тому же экземпляру. Она подходит для сценариев, в которых требуется сохранение сеанса (например, для продолжительных пользовательских сеансов в сервисе с состоянием).
- _Weighted Round Robin_. Аналогична стратегии Round Rrobin, но с весами, присваиваемыми каждому экземпляру на основе его возможностей или характеристик производительности. Экземпляры с более высокими весами получают больше запросов. Такая стратегия идеально подходит для систем, где некоторые экземпляры более мощные и могут обрабатывать большую долю нагрузки.
- _Случайное распределение_. Запросы направляются к экземплярам случайным образом. Несмотря на свою простоту, эта стратегия может быть эффективной в определённых сценариях.
- _Нестандартные алгоритмы балансировки нагрузки_. В некоторых средах могут потребоваться пользовательские алгоритмы балансировки нагрузки, разработанные с учётом конкретных требований, таких как географическое положение, задержка или специфические для приложения показатели.

6. **Устойчивость к сбоям**. Внедрение механизмов повторных попыток, использование прерывателей для предотвращения каскадных отказов, обеспечение отсутствия состояния сервисов для повышения отказоустойчивости.

7. **Масштабируемость**. Проектирование сервисов без состояния, использование инструментов оркестрации для масштабирования, реализация политик автоматического масштабирования в зависимости от нагрузки.

8. **Безопасность**. Внедрение HTTPS, использование OAuth2/OpenID Connect для аутентификации и авторизации, обеспечение шифрования данных при передаче и в процессе хранения.

9. **Мониторинг и наблюдение**. Использование инструментов мониторинга (Prometheus, Grafana), централизованного логирования (стек ELK), распределённой трассировки (Jaeger, Zipkin) для отслеживания взаимодействия с сервисами.

10. **Хранение данных**. Выбор хранилища данных в зависимости от требований сервиса, использование NoSQL для масштабируемости, реляционных баз данных для транзакционной согласованности, соответствующее разделение данных.

11. **API-менеджмент**. Использование API-шлюзов (Kong, Apigee), документирование API с помощью инструментов (Swagger/OpenAPI), внедрение версионности для управления изменениями API.

12. **Тестирование и валидация**. недрение автоматизированных конвейеров тестирования, использование mocking и stubbing для зависимых сервисов, контрактное тестирование для обеспечения совместимости между сервисами.

13. **DevOps-практики**. Использование конвейеров CI/CD для автоматизированного тестирования и развёртывания, внедрение IaC с инструментами (Terraform, Ansible) для управления инфраструктурой.

14. **Версионирование и совместимость**. Соблюдение семантической версионности, обеспечение обратной совместимости во время обновлений, постепенный отказ от старых версий.

## Паттерн Saga <a name='saga'></>

**Saga** — это архитектурный паттерн для управления распределёнными транзакциями в микросервисных системах. Он обеспечивает целостность данных и позволяет управлять ошибками при выполнении долговременных бизнес-процессов, которые включают несколько микросервисов.

Работа с данными должна подчиняться требованиям **ACID**:  
_Atomicity_ — атомарность,  
_Consistency_ — целостность,  
_Isolation_ — изолированность,  
_Durability_ — надёжность.

Паттерн можно реализовать двумя способами. Транзакциями управляют через **оркестрацию** или **хореографию**. Оркестрация подразумевает наличие отдельного сервиса-оркестратора, а хореография — обмен событиями между микросервисами.

Откат транзакции происходит за счёт вызова компенсирующих действий, которые откатывают изменения, сделанные на предыдущих шагах.

### Оркестрация

В этом случае есть отдельный сервис-оркестратор. Он управляет последовательностью выполнения шагов и при необходимости инициирует компенсирующие действия.

_Использовать можно, когда:_

- Сложные бизнес-процессы
- Потребность в централизованном управлении
- Транзакционное согласование (возможность отката)
- Сложная бизнес-логика

### Хореография

В этом подходе нет центрального управляющего компонента. Каждый микросервис самостоятелен — он знает, что делать после выполнения своего шага. Микросервисы взаимодействуют через события и сами инициируют компенсирующие действия.

_Использовать можно, когда:_

- Простые взаимодействия
- Независимые микросервисы
- В приоритете гибкость и масштабируемость
- Событийно-ориентированная архитектура

### Обработка ошибок и компенсации в Saga

Стратегии обработки ошибок:

1. Компенсационные транзакции — это действия, которые откатывают результаты уже выполненных шагов, если на любом из следующих шагов возникла ошибка.
2. Повторные попытки — «retries» - если транзакция прервалась из-за временной ошибки, система снова попробует выполнить операцию. Попыток будет несколько, и они будут идти друг за другом через одинаковый интервал.
3. Тайм-ауты и дедлайны - назначается дедлайн — время, за которое операция должна завершиться. Если этого не происходит, возникает ошибка тайм-аута и операцию отменяют.
4. Circuit Breaker - «предохранитель» - работает как предохранитель: система предотвращает попытки выполнить операцию, если известно, что она не будет успешной. Когда количество ошибок превышает определённый порог, дальнейшие попытки блокируют на некоторое время.
5. Событийно-ориентированная обработка ошибок - оибки можно обрабатывать через события. Если в ходе операции в микросервисе возникла ошибка, он опубликует событие о неудаче. Другие микросервисы получат и обработают событие.
6. Системы мониторинга и алертов - чтобы обнаруживать ошибки и быстро на них реагировать, нужно настроить системы мониторинга — например, Prometheus или Grafana. Они будут отслеживать метрики и журналы ошибок. Алерты оповестят команду поддержки, если возникнут критические проблемы.
