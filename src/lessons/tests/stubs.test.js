'use strict';

test(`returns undefined by default`, () => {
  const myBananaMock = jest.fn();

  const result = myBananaMock(`banana`);

  expect(result).toBeUndefined();
  expect(myBananaMock).toHaveBeenCalled();
  expect(myBananaMock).toHaveBeenCalledTimes(1);
  expect(myBananaMock).toHaveBeenCalledWith(`banana`);
});

// Можно задать возвращаемое значение с помощью целого набора методов:
// mockFn.mockReturnThis ()
// mockFn.mockReturnValue (value)
// mockFn.mockReturnValueOnce (value)
// mockFn.mockResolvedValue (value)
// mockFn.mockResolvedValueOnce (value)
// mockFn.mockRejectedValue (value)
// mockFn.mockRejectedValueOnce (value)

test(`mock banana value`, () => {
  const myMock = jest.fn();
  myMock.mockReturnValue(`banana`);

  expect(myMock()).toBe(`banana`);
});

// Задать возвращаемое значение с помощью переопределения заглушки. Иногда это может быть удобнее, чем воспользоваться готовыми методами.

test(`mock banana implementation`, () => {
  const myBananaMock = jest.fn(() => `no banana`);

  expect(myBananaMock(`banana`)).toBe(`no banana`);
  expect(myBananaMock).toHaveBeenCalledWith(`banana`);
});

test(`another way for mock implementation`, () => {
  const myBananaMock = jest.fn().mockImplementation(() => `no banana`);

  expect(myBananaMock(`banana`)).toBe(`no banana`);
  expect(myBananaMock).toHaveBeenCalledWith(`banana`);
});
