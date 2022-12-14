# Запуск проекта

В директории `input` должен находиться архив под названием **keywords.txt.gz**, содержащий 1 файл - `keywords.txt` в формате `GZIP`

Для запуска проекта необходимо выполнить следующие действия:

```
# Установка зависимостей
npm i
# Запуск проекта
npm run dev
```

# Описание задания

## Node.js

Дан файл “keywords.txt.gz”: https://drive.google.com/file/d/1Ywq92Rzsj0BTER4Bg5kLz6nu-m_Bd_r3/view?usp=sharing
Это сжатый текстовый файл, каждая строка в файле это некое словосочетание слов - для краткости назовем это “ключевым словом”. Гарантируется, что в названии ключевого слова не встречается символ переноса строки “\n”. Содержание файла сжато с помощью gzip. Количество ключевых слов в файле теоретически не ограничено, то есть в файле могут быть миллиарды строк, и все содержимое файла после разжатия может весить гигабайты.
Пример содержания файла после разжатия: https://pastebin.com/Bem3yCSr

Дан пример интерфейса (pastebin ниже) `ISearchVolumeClient` с одним методом `getSearchVolume`, который для переданного массива ключевых слов считает значение searchVolume и возвращает его для каждого ключа. В рамках выполнения этой тестовой задачи настоящая реализация клиента не важна, searchVolume - это просто некое число. Поэтому для выполнения задания представлен фейковый класс `FakeSearchVolumeClient` (тоже в pastebin) который имитирует работу настоящего клиента и генерирует случайные searchVolume числа для переданных ключевых слов. В настоящей реализации количество ключевых слов переданных в метод getSearchVolume практически не влияет на время выполнения, но сама функция выполняется долго. Фейковый класс имитирует это поведение ожидая 2 секунды для каждого вызова метода `getSearchVolume`, независимо от количества ключевых слов. Поэтому есть смысл вызывать метод getSearchVolume с наибольшим возможным количеством ключевых слов, чтобы ускорить работу. Также `getSearchVolume` не поддерживает вызов больше чем с 100-ей ключевых слов за раз.
Код на TypeScript для `ISearchVolumeClient` и `FakeSearchVolumeClient`: https://pastebin.com/8D7NVLtS

### Задача.

Написать Node.js программу, которая для каждого ключевого слова в исходном файле “keywords.txt.gz”, получит его searchVolume с помощью предоставленного `FakeSearchVolumeClient` (код для `FakeSearchVolumeClient` и `ISearchVolumeClient` можно просто скопировать в свой проект). Результат для каждого ключевого слова нужно выводить в консоль в формате: [КЛЮЧЕВОЕ СЛОВО] = [SEARCH VOLUME], например: “keyword 1 = 123123”.
Для разархивирования файла подойдет модуль `zlib` с функцией `zlib.createGunzip()`: https://nodejs.org/api/zlib.html#zlib_zlib_creategunzip_options

Готовый проект скинуть для проверки (архивом, или ссылкой на гитхаб). Проверяться будет на входном файле с миллиардом ключевых слов.

### Важно:

- Нельзя использовать сторонние готовые библиотеки из npm (или другого менеджера пакетов) для решения задачи. Можно использовать пакеты для разработки (devDependencies, например typescript модуль для проекта на TypeScript), но не для самой логики программы. Для решения задачи можно использовать только нативное Node.js API: https://nodejs.org/api/index.html.
- Программа должна успешно обрабатывать входной файл `keywords.txt.gz` независимо от его размера - будь там пару строк, или несколько миллиардов.
- Программа должна обрабатывать входной файл “keywords.txt.gz” именно как gzip архив, а не просто текстовый файл.
- Нужно минимизировать количество запросов к методу `getSearchVolume` в интерфейсе `ISearchVolumeClient` (отправлять как можно больше ключей за раз).
- Для асинхронной работы использовать async / await.
- Проект должен быть выполнен на Node.js версии 18+.
- Проект должен быть выполнен на TypeScript версии 4.8+.
