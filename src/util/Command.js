
const REPEAT_DELAY = 100;

class Command {

  constructor(options) {
    this.options = options;
    this.name = this.options.ctrl.name;
    this.started = false;
    this.running = false;
    this.hold = 0;
    this.repeat = 0;
    this.repeats = 0;
    this.repeating = false;
  }

  start() {
    this.started = true;
    if (!this.running) {
      this._startSequence();
    }
  }

  stop() {
    this.started = false;
    const ctrl = this.options.ctrl;
    if (this.running && !(+ctrl.holdFor || +ctrl.repeatFor)) {
      this._completeSequence();
    }
  }

  destroy() {
    if (this.running) {
      this._completeSequence();
    } else {
      this.options.complete();
    }
  }

  _startSequence() {
    this.running = true;
    this.options.activate();
    const ctrl = this.options.ctrl;
    if (+ctrl.repeatFor) {
      this.repeats = 0;
      this.repeating = true;
      this.repeat = setTimeout(this._repeat.bind(this), REPEAT_DELAY);
    } else if (+ctrl.holdFor) {
      this.hold = setTimeout(this._hold.bind(this), +ctrl.holdFor * 1000);
    } else {
      this.options.activate();
    }
  }

  _completeSequence() {
    if (this.started) {
      this._startSequence();
    } else {
      this.running = false;
      clearTimeout(this.repeat);
      clearTimeout(this.hold);
      this.options.deactivate();
      this.options.complete();
    }
  }

  _repeat() {
    const ctrl = this.options.ctrl;
    if (this.repeating) {
      this.options.deactivate();
      this.repeat = setTimeout(this._repeat.bind(this), REPEAT_DELAY);
      this.repeating = false;
    } else if (++this.repeats < +ctrl.repeatFor) {
      this.repeating = true;
      this.options.activate();
      this.repeat = setTimeout(this._repeat.bind(this), REPEAT_DELAY);
    } else if (this.started) {
      this._startSequence();
    } else {
      this._completeSequence();
    }
  }

  _hold() {
    const ctrl = this.options.ctrl;
    if (this.started) {
      this.hold = setTimeout(this._hold.bind(this), +ctrl.holdFor * 1000);
    } else {
      this._completeSequence();
    }
  }
}

export default Command;