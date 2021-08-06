/* eslint-disable no-undef */
'use strict';

const useNightTheme = (night = true) => {
  const theme = night ? `dark` : `light`;
  document.cookie = `theme=${theme}; Max-Age=8640000`;
  window.location.reload(true);
};

const button = document.querySelector(`button`);

button.addEventListener(`click`, () => {
  const theme = document.cookie.match(/theme=([^;$]+)/)[1];
  if (theme === `light`) {
    useNightTheme(true);
  } else {
    useNightTheme(false);
  }
});
