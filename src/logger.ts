type OnOffMap = { [k: string]: boolean };

class Logger {
  // TODO: Horrible hack, wrapped OnOffMap into a callback to comply to [k: string]: (..args: any[]) => any
  private onOffMap: () => OnOffMap; 
  [k: string]: (...args: any[]) => any;

  constructor(onOffMap?: OnOffMap) {
    const oom = onOffMap || {
      log: true,
      debug: false,
    };
    this.onOffMap = () => oom;
    const onMap = Object.keys(oom).filter(k => oom[k] === true);
    this.turnOn(Object.keys(onMap));
    const offMap = Object.keys(oom).filter(k => oom[k] !== true);
    this.turnOff(Object.keys(offMap));
  }

  turnOn(levels?: string | string[]) {
    levels = levels || Object.keys(this.onOffMap());
    this._turnInto(levels, function(...params: any[]){
      console.log(...params);
      return params;
    });
  }

  turnOff(levels?: string | string[]) {
    levels = levels || Object.keys(this.onOffMap());
    this._turnInto(levels, function(){});
  }

  _turnInto<T extends (...args: any[]) => any>(levels: string | string[], into: T) {
    if (typeof levels === 'string') {
      levels = [levels];
    } else if (typeof levels === 'undefined') {
      levels = Object.keys(this.onOffMap()); //all on
    }
    for(let level of levels) {
      this[level] = into;
    }
  }

}

const logger = new Logger();

export { Logger, logger };
export default logger;
