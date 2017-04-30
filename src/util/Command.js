
class Command {

  constructor(options) {
    this.options = options;
    this.name = this.options.ctrl.name;
    this.running = false;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.options.activate();
    }
  }

  stop() {
    if (this.running) {
      this.running = false;
      this.options.deactivate();
      this.options.complete();
    }
  }

  destroy() {
    if (this.running) {
      this.stop();
    } else {
      this.options.complete();
    }
  }
}

export default Command;