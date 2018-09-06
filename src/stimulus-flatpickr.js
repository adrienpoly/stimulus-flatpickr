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

  change() {}

  open() {}

  close() {}

  monthChange() {}

  yearChange() {}

  ready() {}

  valueUpdate() {}

  dayCreate() {}

  get altInputTarget() {
    if (this.element.querySelector(".flatpickr-input")) {
      return this.element.querySelector(".flatpickr-input");
    } else {
      return this.element;
    }
  }

  _initializeEvents() {
    events.forEach(event => {
      const hook = `on${capitalize(event)}`;
      this.config[hook] = this[event].bind(this);
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
    if (this.data.has("date-format")) {
      this.config.dateFormat = convertDateFormat(this.data.get("date-format"));
    }
    if (this.data.has("alt-format")) {
      this.config.altFormat = convertDateFormat(this.data.get("alt-format"));
    }
    if (this.data.has("aria-date-format")) {
      this.config.ariaDateFormat = convertDateFormat(
        this.data.get("aria-date-format")
      );
    }
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
