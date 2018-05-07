import { Controller } from "stimulus";
import flatpickr from "flatpickr";
import { kebabCase, capitalize } from "./utils";
import { options } from "./config_options";
import { events } from "./events";

class Flatpickr extends Controller {
  initialize() {
    this.config = {};
  }

  connect() {
    this.initializeOptions();
    this.initializeEvents();

    this.fp = flatpickr(this.element, {
      ...this.config
    });
  }

  disconnect() {
    this.fp.destroy();
  }

  initializeEvents() {
    events.forEach(event => {
      const hook = `on${capitalize(event)}`;
      this.config[hook] = this[event];
    });
  }

  initializeOptions() {
    Object.keys(options).forEach(optionType => {
      const optionsCamelCase = options[optionType];
      optionsCamelCase.forEach(option => {
        const optionKebab = kebabCase(option);
        if (this.data.has(optionKebab)) {
          this.config[option] = this[optionType](optionKebab);
        }
      });
    });
  }

  string(option) {
    return this.data.get(option);
  }

  date(option) {
    return this.data.get(option);
  }

  boolean(option) {
    return this.data.get(option) === "true";
  }

  array(option) {
    return JSON.parse(this.data.get(option));
  }

  number(option) {
    return parseInt(this.data.get(option));
  }
}

export default Flatpickr;
