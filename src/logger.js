let loggerIsOn = false;
const logger = {
  turnOn: function() {
    loggerIsOn = true;
  },
  turnOff: function() {
    loggerIsOn = false;
  },
  log: function(...params) {
    loggerIsOn && console.log(...params);
    return loggerIsOn;
  },
}

if (process.env.SAYLO_LOGGING && (process.env.SAYLO_LOGGING !== '0') || process.env.SAYLO_LOGGING === '1') {
  logger.turnOn();
} else {
  logger.turnOff();
}

export default logger;
