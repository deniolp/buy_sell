'use strict';

const buffer = Buffer.alloc(5);
const anotherBuffer = Buffer.alloc(2);

// Запишем в первый буфер строку «World»
buffer.write(`World`);
console.log(buffer);

// Попробуем записать во второй буфер фразу «Great World»
anotherBuffer.write(`Great World`);
console.log(anotherBuffer);

// Прочитаем буфер
console.log(anotherBuffer.toString());

const thirdBuffer = Buffer.from(`HTML`);
thirdBuffer.write(`CSS`);
console.log(thirdBuffer.toString());


const fourthBuffer = Buffer.from(`HTML`);
fourthBuffer.write(`CSS`, 1, 3, `utf8`);
console.log(fourthBuffer.toString());
