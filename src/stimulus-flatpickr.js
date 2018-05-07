import { Controller } from "stimulus";
import flatpickr from "flatpickr";
import { kebabCase, capitalize } from "./utils";
import {
  booleanOptions,
  stringOptions,
  numberOptions,
  arrayOptions,
  dateOptions
} from "./config_options";
import { events } from "./events";

class Flatpickr extends Controller {
  connect() {
    this.initializeBooleans();
    this.initializeStrings();
    this.initializeNumbers();
    this.initializeArrays();
    this.initializeDates();

    this.initializeEvents();

    this.fp = flatpickr(this.element, {
      ...this.config
    });
  }

  initialize() {
    this.config = {};
  }

  initializeEvents() {
    events.forEach(event => {
      const hook = `on${capitalize(event)}`;
      this.config[hook] = this[event];
    });
  }

  initializeBooleans() {
    booleanOptions.forEach(option => {
      const optionKebab = kebabCase(option);
      if (this.data.has(optionKebab)) {
        this.config[option] = this.data.get(optionKebab) === "true";
      }
    });
  }

  initializeStrings() {
    stringOptions.forEach(option => {
      const optionKebab = kebabCase(option);
      if (this.data.has(optionKebab)) {
        this.config[option] = this.data.get(optionKebab);
      }
    });
  }

  initializeNumbers() {
    numberOptions.forEach(option => {
      const optionKebab = kebabCase(option);
      if (this.data.has(optionKebab)) {
        this.config[option] = parseInt(this.data.get(optionKebab));
      }
    });
  }

  initializeArrays() {
    arrayOptions.forEach(option => {
      const optionKebab = kebabCase(option);
      if (this.data.has(optionKebab)) {
        this.config[option] = JSON.parse(this.data.get(optionKebab));
      }
    });
  }

  initializeDates() {
    dateOptions.forEach(option => {
      const optionKebab = kebabCase(option);
      if (this.data.has(optionKebab)) {
        this.config[option] = this.data.get(optionKebab);
      }
    });
  }
}

export default Flatpickr;
