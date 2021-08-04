/* countries */
INSERT INTO countries VALUES
(1, 'Великобритания'),
(2, 'Нидерланды'),
(3, 'Канада'),
(4, 'Франция'),
(5, 'Испания'),
(6, 'США'),
(7, 'Германия'),
(8, 'Россия');

/* authors */
INSERT INTO authors VALUES
(1, 'Стивен', 'Кинг', '1947-09-21', 6),
(2, 'Сергей', 'Лукьяненко', '1968-04-11', 8),
(3, 'Джон', 'Резиг', '1984-05-08', 6),
(4, 'Артур Конан', 'Дойл', '1859-05-22', 1),
(5, 'Говард Филлипс', 'Лавкрафт', '1890-08-20', 6),
(6, 'Антон', 'Чехов', '1860-01-29', 8),
(7, 'Джанет', 'Азимов', '1926-08-06', 6),
(8, 'Айзек', 'Азимов', '1919-10-04', 8),
(9, 'Курт', 'Занднер', '1910-08-05', 7),
(10, 'Питер', 'Уоттс', '1958-01-25', 3),
(11, 'Роберт', 'Сойер', '1960-04-29', 3),
(12, 'Мишель', 'Верн', '1861-08-04', 4);

/* genres */
INSERT INTO genres VALUES
(1, 'Фантастика'),
(2, 'Ужасы'),
(3, 'Драма'),
(4, 'Трагедия'),
(5, 'Комедия'),
(6, 'Роман'),
(7, 'IT');

/* publishers */
INSERT INTO publishers VALUES
(1, 'Pearson', 1),
(2, 'Reed Elsevier', 2),
(3, 'ThomsonReuters', 3),
(4, 'Wolters Kluwer', 2),
(5, 'Hachette Livre', 4),
(6, 'Grupo Planeta', 5),
(7, 'McGraw–Hill Education', 6),
(8, 'Random House', 7),
(9, 'Holtzbrinck', 7),
(10, 'Scholastic', 6),
(11, 'АСТ', 8),
(12, 'Питер', 8);

/* books */
INSERT INTO books VALUES
(1, 'Оно', '1986-01-01', 1138, 1, 6),
(2, 'Кладбище домашних животных', '1983-11-13', 373, 1, 6),
(3, 'Под куполом', '2009-01-01', 1106, 1, 6),
(4, '11/22/63', '2011-11-08', 566, 1, 6),
(5, 'Зелёная миля', '1996-01-01', 496, 1, 6),
(6, 'Доктор сон', '2013-01-01', 531, 1, 6),
(7, 'Чужак', '2018-01-01', 590, 1, 6),
(8, 'Институт', '2019-09-01', 600, 1, 6),
(9, 'Ночной дозор', '1998-01-01', 400, 2, NULL),
(10, 'Дневной дозор', '2000-01-01', 456, 2, 8),
(11, 'Сумеречный дозор', '2003-01-01', 550, 2, 8),
(12, 'Последний дозор', '2005-01-01', 338, 2, 8),
(13, 'Лабиринт отражений', '1997-01-01', 334, 2, 8),
(14, 'Черновик', '2005-01-01', 600, 2, 8),
(15, 'Чистовик', '2007-01-01', 550, 2, 8),
(16, 'JavaScript. Профессиональные приемы программирования', '2008-01-01', 384, 3, 6),
(17, 'Этюд в багровых тонах', '1887-01-01', 300, 4, 1),
(18, 'Знак четырёх', '1890-01-01', 800, 4, 1),
(19, 'Долина ужаса', '1915-01-01', 612, 4, 1),
(20, 'Страна тумана', '1926-01-01', 500, 4, 7),
(21, 'Склеп', '1922-03-01', 344, 5, 6),
(22, 'Заброшенный дом', '1924-10-01', 400, 5, 6),
(23, 'Зов Ктулху', '1926-06-01', 400, 5, 6),
(24, 'В вагоне', '1881-01-01', 85, 6, 8),
(25, 'Толстый и тонкий', '1883-01-01', 8, 6, 8),
(26, 'Орден', '1883-01-01', 15, 6, 8),
(27, 'Ложная слепота', '2006-01-01', 755, 10, 3),
(28, 'Эхопраксия', '2014-01-01', 480, 10, 3),
(29, 'Я робот', '1950-01-01', 253, 8, 6),
(30, 'Конец Вечности', '1955-01-01', 199, 8, 6),
(31, 'Nacht ohne Gnade', '1958-01-01', 777, 9, 7),
(32, 'Signal aus dem Weltall', '1960-01-01', 666, 9, 7),
(33, 'Курьерский поезд будущего', '1888-01-01', 426, 12, 4),
(34, 'Смертельный эксперимент', '1995-01-01', 566, 11, 3),
(35, 'Norby and the Lost Princess', '1985-01-01', 664, 7, 6);

/* books_genres */
INSERT INTO books_genres VALUES
(1, 2),
(1, 6),
(2, 2),
(3, 1),
(3, 6),
(4, 1),
(4, 6),
(5, 3),
(6, 2),
(6, 3),
(7, 2),
(8, 1),
(8, 3),
(8, 6),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(15, 2),
(16, 7),
(17, 3),
(18, 3),
(19, 2),
(20, 2),
(21, 2),
(22, 2),
(23, 2),
(23, 3),
(24, 4),
(25, 4),
(25, 5),
(26, 3),
(27, 1),
(28, 1),
(29, 1),
(30, 1),
(31, 1),
(32, 1),
(33, 1),
(34, 1),
(34, 6),
(35, 1);

/* books_publishers */
INSERT INTO books_publishers VALUES
(1,  1),
(1,  2),
(1, 11),
(2, 1),
(2, 11),
(2, 5),
(3, 11),
(3, 1),
(4, 1),
(4, 11),
(5, 1),
(5, 9),
(5, 11),
(6, 1),
(6, 11),
(6, 8),
(7, 1),
(7, 2),
(7, 11),
(7, 7),
(8, 1),
(8, 11),
(9, 11),
(10, 11),
(13, 11),
(14, 11),
(15, 11),
(16, 12),
(17, 11),
(18, 11),
(19, 11),
(20, 11),
(21, 11),
(22, 11),
(22, 7),
(23, 11),
(24, 11),
(25, 11),
(26, 11),
(27, 1),
(27, 2),
(27, 11),
(28, 1),
(28, 8),
(28, 5),
(29, 1),
(29, 11),
(30, 11),
(30, 1),
(30, 2),
(30, 3),
(30, 4),
(31, 4),
(32, 5),
(33, 11),
(34, 3),
(34, 1),
(35, 1);

/* readers */
INSERT INTO readers VALUES
(1, 'Иван', 'Иванов', '1985-01-29'),
(2, 'Андрей', 'Петров', '1990-03-12'),
(3, 'Антон', 'Верный', '1983-04-08'),
(4, 'Владимир', 'Андропов', '1979-05-03'),
(5, 'Константин', 'Сидоров', '1989-03-14'),
(6, 'Эдуард', 'Чтецов', '1982-02-14');

/* books_readers */
INSERT INTO books_readers VALUES
(1, 1),
(2, 1),
(3, 1),
(1, 2),
(34, 2),
(1, 3),
(29, 1),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(7, 3),
(8, 3),
(15, 3),
(16, 4),
(16, 5),
(17, 5),
(18, 5),
(19, 5),
(20, 5),
(21, 5);