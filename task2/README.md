# SQL

Данные по таблице: https://docs.google.com/spreadsheets/d/19h1A0qNJEaq9MpALWGEqe5uf1CvxTJfyrwgJZ64WlWs/edit#gid=1224508797

Дано таблицу со следующей схемой:

| Name                | Type     |
| ------------------- | -------- |
| userId              | UInt32   |
| eventDate           | Date     |
| generatedAtDateTime | DateTime |
| keywordId           | UInt64   |
| impressions         | Int32    |
| clicks              | Int32    |
| cost                | Float32  |
| orders              | Float32  |
| sales               | Float32  |

Каждая запись в таблице говорит о том, что на момент создания этой записи (время создания в “generatedAtDateTime”) для конкретного пользователя в системе с id “userId” в конкретную дату “eventDate” некая сущность “Keyword” с id “keywordId” имела определенные значения для метрик: “impressions”, “clicks”, “cost”, “orders”, “sales”.
Для одного и тоже “userId” и “keywordId” может быть несколько записей.

Пример данных в таблице:
| userId | eventDate | generatedAtDateTime | keywordId | impressions | clicks | cost | orders | sales |
|--------|------------|---------------------|-----------|-------------|--------|------|--------|-------|
| 1 | 2020-06-23 | 2020-06-24 15:00:00 | 1 | 10 | 0 | 0 | 0 | 0 |
| 1 | 2020-06-23 | 2020-06-24 16:00:00 | 1 | 100 | 4 | 4.47 | 1 | 35.99 |
| 1 | 2020-06-24 | 2020-06-24 18:00:00 | 1 | 250 | 2 | 2.23 | 0 | 0 |
| 1 | 2020-06-23 | 2020-06-24 17:00:00 | 2 | 500 | 24 | 10.2 | 2 | 98.98 |

Для этой таблицы важно понимать какая запись для пары eventDate и keywordId является “актуальной”:
В примере, для keywordId=1 существуют две записи с одинаковыми eventDate=”2020-06-23”. Из двух записей “актуальная” та, у которой больше “generatedAtDateTime” (которая новее). В данном случае это запись с generatedAtDateTime=”2020-06-24 16:00:00”. Таким образом, сущность “Keyword” с keywordId=1 в день eventDate=”2020-06-23” имела 100 impressions, 4 clicks, 4.47 cost, 1 orders и 35.99 sales, поскольку это более новая запись.
Та же сущность Keyword с keywordId=1 собрала метрики и в день eventDate=”2020-06-24”: 250 impressions, 2 clicks, 2.23 cost, 0 orders, 0 sales.
Так таблица постепенно заполняется данными о работе сущностей “Keyword” для дней “eventDate”, и время создания каждой записи можно найти в “generatedAtDateTime”.

## Задача.

Нужно написать SQL запрос который для пользователя с определенным userId (например 1), для промежутка eventDate дат (например между “2020-05-01” и “2020-06-01”) выведет “актуальные” метрики impressions, clicks, cost, orders, sales для каждого keywordId по каждому eventDate дню.
Например, используя данные из примера, для следующих входных параметров:

- userId=1
- eventDate >= “2020-06-01”, eventDate <= “2020-07-01”

SQL запрос должен вернуть:

| userId | eventDate  | generatedAtDateTime | keywordId | impressions | clicks | cost | orders | sales |
| ------ | ---------- | ------------------- | --------- | ----------- | ------ | ---- | ------ | ----- |
| 1      | 2020-06-23 | 2020-06-24 16:00:00 | 1         | 100         | 4      | 4.47 | 1      | 35.99 |
| 1      | 2020-06-24 | 2020-06-24 18:00:00 | 1         | 250         | 2      | 2.23 | 0      | 0     |
| 1      | 2020-06-23 | 2020-06-24 17:00:00 | 2         | 500         | 24     | 10.2 | 2      | 98.98 |

# Решение

Решение данного задания находится в файле `solution.sql`, в котором предоставлен запрос, который выбирает "актуальные" метрики для каждого keywordId по каждому eventDate дню.

Решение было протестировано на предоставленном дата-сете.
