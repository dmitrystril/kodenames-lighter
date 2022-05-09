## About

An online implementation of "Codenames" board game.
Lighter version.

## Tech stack

- React
- Typescript
- Apollo
- TypeGraphQL
- TypeORM
- GraphQL
- styled-components
- Express

## Todo

- i18n: russian, english
- Game log
- Dark mode

## Nice-to-have

- Add rules of the game
- Add option to upload custom dictionary

##### Dev notes

sudo -u postgres psql
sudo service postgresql restart
\dx uuid-ossp - check if extension is installed

create database kodenames;
create user admin with encrypted password 'admin';
grant all privileges on database kodenames to admin;

\c kodenames
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\i /home/dmitry/Projects/my/kodenames/kodenames-server/db_data.sql

Tips:

1. [✓] Взять ключ из урл
   Если ключа в урл нет - сгенерировать его по слогам на клиенте, проставить в поле и в урл
2. [✓] При нажатии "сгенерировать" - проставить сгенерированный ключ в поле и в урл
3. [✓] Получить последние данные о командах из localStorage и проинициализировать поля.
4. [✓] Каждый раз при генерации ключа/добавлении игрока тасовать команду и сохранять в localStorage.
5. При нажатии на кнопки перехода к столу: передать ключ в функцию createGame(key) на сервер
6. Получить от сервера новый список карт для нового ключа или существующий список для существующего ключа и перейти к столу в соответствующий режим: капитан/общее игровое поле
7. При окончании игры удалить сохраненную игры
