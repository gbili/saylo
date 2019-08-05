"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
var _default = logger;
exports.default = _default;