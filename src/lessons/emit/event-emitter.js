'use strict';

const EventEmitter = require(`events`);

const TIME_INTERVAL = 1000;
const DEFAULT_STEP = -1;
const PIZZA_STATUSES = [
  `orderAccept`,
  `prepareDough`,
  `prepareToping`,
  `bakingPizza`,
  `done`
];

class Pizza extends EventEmitter {
  constructor(name) {
    super();
    this._name = name;
    this._step = DEFAULT_STEP;
    this._cook = this._cook.bind(this);
    this._timerId = null;
  }

  _reset() {
    this._step = DEFAULT_STEP;
    clearInterval(this._timerId);
  }

  _cook() {
    this._step++;

    const currentStep = PIZZA_STATUSES[this._step];
    this.emit(currentStep, `Статус пиццы "${this._name}": ${currentStep}`);

    if (this._step === PIZZA_STATUSES.length - 1) {
      this._reset();
    }
  }

  start() {
    this._reset();
    this._timerId = setInterval(this._cook, TIME_INTERVAL);
  }
}

const myPizza = new Pizza(`Мексикано`);

myPizza.on(`orderAccept`, (data) => console.log(data));
myPizza.on(`prepareDough`, (data) => console.log(data));
myPizza.on(`bakingPizza`, (data) => console.log(data));
myPizza.on(`prepareToping`, (data) => console.log(data));
myPizza.on(`done`, (data) => console.log(data));

myPizza.start();
