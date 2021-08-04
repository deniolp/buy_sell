'use strict';

beforeEach(() => {
  console.log(`Перед каждым..`);
});

afterAll(() => {
  console.log(`После всех..`);
});

test(`null`, () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
});

test(`null`, () => {
  const n = null;
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test(`2 + 2`, () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe и toEqual применимы к числам
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test(`adding floating point numbers`, () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3);     // Тест упадет
  expect(value).toBeCloseTo(0.3); // Проверка пройдет
});

// Для проверки регулярных выражений
test(`banana has nana`, () => {
  expect(`banana`).toMatch(/nana/);
});

// Для проверки содержания элемента в массиве
test(`is array with banana`, () => {
  expect([`orange`, `lemon`, `banana`]).toContain(`banana`);
});

// Проверка ошибок и исключений выполняется с помощью метода toThrow
const getBananas = () => {
  throw new Error(`No banana!`);
};

test(`has no banana`, () => {
  expect(getBananas).toThrow();
  expect(getBananas).toThrow(Error);

  // Проверка на конкретную ошибку или RegExp
  expect(getBananas).toThrow(`No banana!`);
  expect(getBananas).toThrow(/banana/);
});
