"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.logger = exports.Logger = void 0;

class Logger {
  constructor(onOffMap) {
    this.onOffMap = onOffMap || {
      log: true,
      debug: false
    };
    const onMap = Object.keys(this.onOffMap).filter(k => this.onOffMap[k] === true);
    this.turnOn(Object.keys(onMap));
    const offMap = Object.keys(this.onOffMap).filter(k => this.onOffMap[k] !== true);
    this.turnOff(Object.keys(offMap));
  }

  turnOn(levels) {
    this._turnInto(levels, function (...params) {
      console.log(...params);
      return params;
    });
  }

  turnOff(levels) {
    this._turnInto(levels, function () {});
  }

  _turnInto(levels, into) {
    if (typeof levels === 'string') {
      levels = [levels];
    } else if (typeof levels === 'undefined') {
      levels = Object.keys(this.onOffMap); //all on
    }

    for (let level of levels) {
      this[level] = into;
    }
  }

}

exports.Logger = Logger;
const logger = new Logger();
exports.logger = logger;

if (process.env.SAYLO_LOGGING && process.env.SAYLO_LOGGING !== '0' || process.env.SAYLO_LOGGING === '1') {
  logger.turnOn();
} else {
  logger.turnOff();
}

var _default = logger;
exports.default = _default;