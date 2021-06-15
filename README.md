# Проект Mesto бэкенд

Бэкенд для интерактивной страницы, куда пользователи могут добавлять фотографии мест, в которых они побывали, смотреть и лайкать фотографии других пользователей.

* Адрес сайта - [https://mesto.kohanniy.nomoredomains.club](https://mesto.kohanniy.nomoredomains.club)
* Домен бэкенда - [https://api.mesto.kohanniy.nomoredomains.club](https://api.mesto.kohanniy.nomoredomains.club)
* IP-адрес бэкенда - [178.154.205.41](https://178.154.205.41)

## Обзор

Бэкенд - Node.js/Express.js. База данных - MongoDB. Для взаимодействия Node с MongoDB используется Mongoose. Реализована валидация приходящих данных с помощью модулей validator и Joi/celebrate и централизованная обработка ошибок.

Сервер развернут на виртуальной машине Yandex.Cloud, подключен nginx для перенаправления запросов с 80 порта на порт, который слушает Node.
