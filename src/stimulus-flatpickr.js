import { Controller } from "stimulus";
import flatpickr from "flatpickr";
import { kebabCase, capitalize } from "./utils";
import { options } from "./config_options";
import { events } from "./events";
import { elements } from "./elements";
import { convertDateFormat } from "./strftime_mapping";

class Flatpickr extends Controller {
  initialize() {
    this.config = {};
  }

  connect() {
    this.initializeEvents();
    this.initializeOptions();

    this.fp = flatpickr(this.element, {
      ...this.config
    });

    this.initializeElements();
  }

  disconnect() {
    this.fp.destroy();
  }

  initializeEvents() {
    events.forEach(event => {
      const hook = `on${capitalize(event)}`;
      this.config[hook] = this[event].bind(this);
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

  initializeElements() {
    elements.forEach(element => {
      this[`${element}Target`] = this.fp[element];
    });
  }

  get altInputTarget() {
    if (this.element.querySelector(".flatpickr-input")) {
      return this.element.querySelector(".flatpickr-input");
    } else {
      return this.element;
    }
  }

  change() {}

  open() {}

  close() {}

  monthChange() {}

  yearChange() {}

  ready() {}

  valueUpdate() {}

  dayCreate() {}

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
