'use strict';

const multiply = require(`./basics`);

describe(`Multiply tests`, () => {
  test(`multiply 2 by 2 should be equal 4`, () => {
    expect(multiply(2, 2)).toBe(4);
  });

  test.each([
    [1, 1, 1],
    [1, 2, 2],
    [2, 3, 6]
  ])(`multiply %i by %i should be equal %i`, (a, b, expected) => {
    expect(multiply(a, b)).toBe(expected);
  });

  // test.only => во всем файле с тестами будет сделан только этот один тест
  // test.only(`multiply 2 by 2 should be equal 4`, () => {
  //   expect(multiply(2, 2)).toBe(4);
  // });

  test(`multiply -2 by 2 should be equal -4`, () => {
    expect(multiply(-2, 2)).toBe(-4);
  });

  // test.skip => во всем файле с тестами будут сделаны все тесты, кроме этого
  test.skip(`multiply 4 by 2 should be equal 8`, () => {
    expect(multiply(4, 2)).toBe(8);
  });
});

describe(`Other tests I should do`, () => {
  test.todo(`other test`);
});
