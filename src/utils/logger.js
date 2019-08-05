import 'dotenv/config';
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
  },
}

if (process.env.LOGGING === '1') {
  logger.turnOn();
} else {
  logger.turnOff();
}

export default logger;
