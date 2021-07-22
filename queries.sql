-- Получить список всех категорий (идентификатор, наименование категории)
SELECT id AS "ID", title AS "Жанр" FROM categories;

-- Получить список категорий для которых создано минимум одно объявление (идентификатор, наименование категории)

SELECT id AS "ID", title AS "Жанр"
FROM categories
  JOIN offers_categories
    ON id = category_id
  GROUP BY id
  ORDER BY id;

-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории)
SELECT id AS "ID", title AS "Жанр", COUNT(offer_id) AS "Количество книг"
FROM categories
  LEFT JOIN offers_categories
    ON id = category_id
  GROUP BY id
  ORDER BY id;

-- Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие объявления
SELECT
  offers.id AS "ID",
  offers.title AS "Заголовок",
  offers.sum AS "Стоимость",
  offers.type AS "Тип",
  offers.description AS "Описание",
  offers.created_date AS "Дата создания",
  CONCAT(users.first_name, ' ', users.last_name) AS "Имя и фамилия",
  users.email AS "Email",
  COUNT(comments.id) AS "Количество комментариев",
  STRING_AGG(DISTINCT categories.title, ', ') AS "Жанры"
FROM offers
  JOIN offers_categories ON offers.id = offers_categories.offer_id
  JOIN categories ON offers_categories.category_id = categories.id
  LEFT JOIN comments ON comments.offer_id = offers.id
  JOIN users ON users.id = offers.user_id
  GROUP BY offers.id, users.id
  ORDER BY offers.created_date DESC;

-- Получить полную информацию определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий)
SELECT
  offers.id AS "ID",
  offers.title AS "Заголовок",
  offers.sum AS "Стоимость",
  offers.type AS "Тип",
  offers.description AS "Описание",
  offers.created_date AS "Дата создания",
  CONCAT(users.first_name, ' ', users.last_name) AS "Имя и фамилия",
  users.email AS "Email",
  COUNT(comments.id) AS "Количество комментариев",
  STRING_AGG(DISTINCT categories.title, ', ') AS "Жанры"
FROM offers
  JOIN offers_categories ON offers.id = offers_categories.offer_id
  JOIN categories ON offers_categories.category_id = categories.id
  LEFT JOIN comments ON comments.offer_id = offers.id
  JOIN users ON users.id = offers.user_id
WHERE offers.id = 2
  GROUP BY offers.id, users.id;

-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария)
SELECT
	comments.id as "ID Комментария",
	comments.offer_id AS "ID Объявления",
	concat(users.first_name, ' ', users.last_name) AS "Имя и фамилия",
	comments.text AS "Текст комментария"
FROM comments
  JOIN users
    ON comments.user_id = users.id
  ORDER BY comments.created_date DESC
  LIMIT 5;

-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии
SELECT
	comments.id as "ID Комментария",
	comments.offer_id AS "ID Объявления",
	concat(users.first_name, ' ', users.last_name) AS "Имя и фамилия",
	comments.text as "Текст комментария"
FROM comments
LEFT JOIN users
  ON comments.user_id = users.id
WHERE comments.offer_id = 2
ORDER BY comments.created_date DESC;

-- Выбрать 2 объявления, соответствующих типу «куплю»
SELECT
	id AS "ID Объявления",
	title AS "Заголовок"
FROM offers
WHERE type = 'buy'
GROUP BY offers.id
LIMIT 2;

-- Обновить заголовок определённого объявления на «Уникальное предложение!»
UPDATE offers
SET title = 'Уникальное предложение!'
WHERE id = 2;