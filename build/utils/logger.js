"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

let loggerIsOn = false;
const logger = {
  turnOn: function () {
    loggerIsOn = true;
  },
  turnOff: function () {
    loggerIsOn = false;
  },
  log: function (...params) {
    loggerIsOn && console.log(...params);
  }
};

if (process.env.LOGGING === '1') {
  logger.turnOn();
} else {
  logger.turnOff();
}

var _default = logger;
exports.default = _default;