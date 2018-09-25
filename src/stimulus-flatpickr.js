import { Controller } from "stimulus";
import flatpickr from "flatpickr";
import { kebabCase, capitalize } from "./utils";
import { options, dateFormats } from "./config_options";
import { events } from "./events";
import { elements } from "./elements";
import { convertDateFormat } from "./strftime_mapping";

class Flatpickr extends Controller {
  initialize() {
    this.config = {};
  }

  connect() {
    this._initializeEvents();
    this._initializeOptions();
    this._initializeDateFormats();

    this.fp = flatpickr(this.element, {
      ...this.config
    });

    this._initializeElements();
  }

  disconnect() {
    this.fp.destroy();
  }

  _initializeEvents() {
    events.forEach(event => {
      if (this[event]) {
        const hook = `on${capitalize(event)}`;
        this.config[hook] = this[event].bind(this);
      }
    });
  }

  _initializeOptions() {
    Object.keys(options).forEach(optionType => {
      const optionsCamelCase = options[optionType];
      optionsCamelCase.forEach(option => {
        const optionKebab = kebabCase(option);
        if (this.data.has(optionKebab)) {
          this.config[option] = this[`_${optionType}`](optionKebab);
        }
      });
    });
  }

  _initializeDateFormats() {
    dateFormats.forEach(dateFormat => {
      if (this.data.has(dateFormat)) {
        this.config[dateFormat] = convertDateFormat(this.data.get(dateFormat));
      }
    });
  }

  _initializeElements() {
    elements.forEach(element => {
      this[`${element}Target`] = this.fp[element];
    });
  }

  _string(option) {
    return this.data.get(option);
  }

  _date(option) {
    return this.data.get(option);
  }

  _boolean(option) {
    return this.data.get(option) === "true";
  }

  _array(option) {
    return JSON.parse(this.data.get(option));
  }

  _number(option) {
    return parseInt(this.data.get(option));
  }
}

export default Flatpickr;
