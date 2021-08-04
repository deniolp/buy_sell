/* Количество книг */
SELECT COUNT(*)
FROM books;

/* Упорядочить результат */
SELECT
  authors.lastname,
  count(authors.lastname)
FROM authors
GROUP BY authors.lastname
ORDER BY count(authors.lastname) DESC;

/* Пример с HAVING */
SELECT
  authors.lastname,
  count(authors.lastname)
FROM authors
GROUP BY
	authors.lastname
HAVING count(authors.lastname) > 1
ORDER BY count(authors.lastname) DESC;

/* Информация о книгах */
SELECT
	authors.firstname AS "Имя",
	authors.lastname AS "Фамилия",
	books.title AS "Название",
	books.release_date AS "Год выхода",
	books.page_count AS "Страниц"
FROM books
INNER JOIN authors
	ON books.author_id = authors.id;

/* Информация о книга + страна */
SELECT
	authors.firstname AS "Имя",
	authors.lastname AS "Фамилия",
	books.title AS "Название",
	books.release_date AS "Год выхода",
	books.page_count AS "Страниц",
	countries.title AS "Страна"
FROM books
INNER JOIN authors
	ON books.author_id = authors.id
LEFT JOIN countries
	ON books.country_id = countries.id;

/* Авторы и количество книг */
SELECT
	authors.firstname AS "Имя",
	authors.lastname AS "Фамилия",
	COUNT(books.id) AS "Кол-во книг"
FROM
	authors
INNER JOIN books
		ON authors.id = books.author_id
GROUP BY
	authors.firstname,
	authors.lastname;

/* Автор + количество книг + упорядочивание */
SELECT
	authors.firstname AS "Имя",
	authors.lastname AS "Фамилия",
	COUNT(books.id) AS "Кол-во книг"
FROM
	authors
INNER JOIN books
		ON authors.id = books.author_id
GROUP BY
	authors.firstname,
	authors.lastname
ORDER BY
	COUNT(books.id) DESC;

/* Функции для работы со строками */
SELECT
	concat(authors.firstname, ' ', authors.lastname) AS "Автор",
	concat(authors.lastname, ' ', left(authors.firstname, 1)) AS "Автор2",
  md5(authors.lastname) AS "hash"
FROM authors

/* Форматирование года */
SELECT
	concat(authors.firstname, ' ', authors.lastname) AS "Автор",
	to_char(authors.birth_date, 'YYYY') "Год рождения"
FROM authors

-- Из таблицы слева (books) должны быть выбраны все записи. Даже те, для которых отсутствует соответствие в таблице countries
SELECT
	books.title AS "Название",
	books.release_date AS "Год выхода",
	books.page_count AS "Страниц",
	countries.title AS "Страна"
FROM books
LEFT JOIN countries
	ON books.country_id = countries.id;

-- В выборку попадут все записи из правой таблицы (присоединяемой). Запрос для получения информации о том сколько каждый читатель прочёл книг
SELECT
	readers.firstname,
	readers.lastname,
	count(books_readers.book_id)
FROM
	books_readers
RIGHT JOIN readers
	ON readers.id = books_readers.reader_id
GROUP BY
	readers.firstname,
	readers.lastname
ORDER BY
	COUNT(books_readers.book_id) DESC;

-- Полное соединение. При таком типе соединений в таблицу результатов попадут не только сопоставленные записи, но и записи обеих таблиц, по которым не удалось выполнить сопоставление
SELECT
	books.title,
	countries.title 
FROM
	books
FULL JOIN countries 
  ON books.country_id = countries.ID;

-- Функция string_agg
SELECT
	books.title AS "Название книги",
	string_agg(genres.title, ', ') AS "Жанры"
FROM books_genres
LEFT JOIN books
	ON books.id = books_genres.book_id
LEFT JOIN genres
	ON genres.id = books_genres.genre_id
GROUP BY books.title;

-- Вложенные запросы
SELECT *
FROM authors
WHERE authors.country_id = 
(
    SELECT id
    FROM countries
    WHERE title = 'США'
)

-- Вложенные запросы с расширенным условием
SELECT *
FROM authors
WHERE authors.country_id IN 
    (
        SELECT id
        FROM countries
        WHERE title = 'США' OR title = 'Россия'
    )

-- То же самое, только с помощью JOIN
SELECT
  authors.lastname,
  authors.firstname,
  countries.title
FROM authors
INNER JOIN 
(
		SELECT title, id
		FROM countries
		WHERE title = 'США' OR title = 'Россия'
) countries
ON authors.country_id = countries.id