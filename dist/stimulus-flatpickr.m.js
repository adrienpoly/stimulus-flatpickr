import { Controller } from 'stimulus';
import flatpickr from 'flatpickr';

var kebabCase = function (string) { return string
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase(); };

var capitalize = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var booleanOptions = [
  "allowInput",
  "altInput",
  "animate",
  "clickOpens",
  "closeOnSelect",
  "disableMobile",
  "enableSeconds",
  "enableTime",
  "inline",
  "noCalendar",
  "shorthandCurrentMonth",
  "static",
  "time_24hr",
  "weekNumbers",
  "wrap"
];

var stringOptions = [
  "altFormat",
  "altInputClass",
  "ariaDateFormat",
  "conjunction",
  "dateFormat",
  "defaultDate",
  "mode",
  "nextArrow",
  "position",
  "prevArrow"
];

var numberOptions = [
  "defaultHour",
  "defaultMinute",
  "defaultSeconds",
  "hourIncrement",
  "minuteIncrement",
  "showMonths"
];

var arrayOptions = ["disable", "enable"];

var dateOptions = ["maxDate", "minDate", "maxTime", "minTime", "now"];

var options = {
  string: stringOptions,
  boolean: booleanOptions,
  date: dateOptions,
  array: arrayOptions,
  number: numberOptions
};

var events = [
  "change",
  "open",
  "close",
  "monthChange",
  "yearChange",
  "ready",
  "valueUpdate",
  "dayCreate"
];

var elements = [
  "input",
  "calendarContainer",
  "prevMonthNav",
  "nextMonthNav",
  "currentMonthElement",
  "currentYearElement",
  "days"
];

var strftimeRegex = /\%[a-zA-Z]/;

var convertDateFormat = function (format) {
  var isStrftime = strftimeRegex.test(format);
  if (isStrftime) {
    var newFormat = format;
    Object.keys(mapping).forEach(function (token) {
      newFormat = newFormat.replace(RegExp(token, "g"), mapping[token]);
    });
    return newFormat;
  } else {
    return format;
  }
};

var mapping = {
  "%Y": "Y",
  "%y": "y",
  "%C": "Y",
  "%m": "m",
  "%-m": "n",
  "%_m": "n",
  "%B": "F",
  "%^B": "F",
  "%b": "M",
  "%^b": "M",
  "%h": "M",
  "%^h": "M",
  "%d": "d",
  "%-d": "j",
  "%e": "j",
  "%H": "H",
  "%k": "H",
  "%I": "h",
  "%l": "h",
  "%P": "K",
  "%p": "K",
  "%M": "i",
  "%S": "S",
  "%A": "l",
  "%a": "D",
  "%w": "w"
};

var Flatpickr = (function (Controller$$1) {
  function Flatpickr () {
    Controller$$1.apply(this, arguments);
  }

  if ( Controller$$1 ) Flatpickr.__proto__ = Controller$$1;
  Flatpickr.prototype = Object.create( Controller$$1 && Controller$$1.prototype );
  Flatpickr.prototype.constructor = Flatpickr;

  var prototypeAccessors = { altInputTarget: { configurable: true } };

  Flatpickr.prototype.initialize = function initialize () {
    this.config = {};
  };

  Flatpickr.prototype.connect = function connect () {
    this.initializeEvents();
    this.initializeOptions();
    this.initializeDateFormats();

    this.fp = flatpickr(this.element, Object.assign({}, this.config));

    this.initializeElements();
  };

  Flatpickr.prototype.disconnect = function disconnect () {
    this.fp.destroy();
  };

  Flatpickr.prototype.initializeEvents = function initializeEvents () {
    var this$1 = this;

    events.forEach(function (event) {
      var hook = "on" + (capitalize(event));
      this$1.config[hook] = this$1[event].bind(this$1);
    });
  };

  Flatpickr.prototype.initializeOptions = function initializeOptions () {
    var this$1 = this;

    Object.keys(options).forEach(function (optionType) {
      var optionsCamelCase = options[optionType];
      optionsCamelCase.forEach(function (option) {
        var optionKebab = kebabCase(option);
        if (this$1.data.has(optionKebab)) {
          this$1.config[option] = this$1[optionType](optionKebab);
        }
      });
    });
  };

  Flatpickr.prototype.initializeDateFormats = function initializeDateFormats () {
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
  };

  Flatpickr.prototype.initializeElements = function initializeElements () {
    var this$1 = this;

    elements.forEach(function (element) {
      this$1[(element + "Target")] = this$1.fp[element];
    });
  };

  prototypeAccessors.altInputTarget.get = function () {
    if (this.element.querySelector(".flatpickr-input")) {
      return this.element.querySelector(".flatpickr-input");
    } else {
      return this.element;
    }
  };

  Flatpickr.prototype.change = function change () {};

  Flatpickr.prototype.open = function open () {};

  Flatpickr.prototype.close = function close () {};

  Flatpickr.prototype.monthChange = function monthChange () {};

  Flatpickr.prototype.yearChange = function yearChange () {};

  Flatpickr.prototype.ready = function ready () {};

  Flatpickr.prototype.valueUpdate = function valueUpdate () {};

  Flatpickr.prototype.dayCreate = function dayCreate () {};

  Flatpickr.prototype.string = function string (option) {
    return this.data.get(option);
  };

  Flatpickr.prototype.date = function date (option) {
    return this.data.get(option);
  };

  Flatpickr.prototype.boolean = function boolean (option) {
    return this.data.get(option) === "true";
  };

  Flatpickr.prototype.array = function array (option) {
    return JSON.parse(this.data.get(option));
  };

  Flatpickr.prototype.number = function number (option) {
    return parseInt(this.data.get(option));
  };

  Object.defineProperties( Flatpickr.prototype, prototypeAccessors );

  return Flatpickr;
}(Controller));

export default Flatpickr;
//# sourceMappingURL=stimulus-flatpickr.m.js.map
