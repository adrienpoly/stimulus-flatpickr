(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('stimulus'), require('flatpickr')) :
  typeof define === 'function' && define.amd ? define(['stimulus', 'flatpickr'], factory) :
  (global.StimulusFlatpickr = factory(global.Stimulus,global.Flatpickr));
}(this, (function (stimulus,flatpickr) { 'use strict';

  flatpickr = flatpickr && flatpickr.hasOwnProperty('default') ? flatpickr['default'] : flatpickr;

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
    "altInputClass",
    "conjunction",
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

  var dateFormats = ["altFormat", "ariaDateFormat", "dateFormat"];

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
    "calendarContainer",
    "currentYearElement",
    "days",
    "daysContainer",
    "input",
    "nextMonthNav",
    "monthNav",
    "prevMonthNav",
    "rContainer",
    "selectedDateElem",
    "todayDateElem",
    "weekdayContainer"
  ];

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

  var strftimeRegex = new RegExp(
    Object.keys(mapping)
      .join("|")
      .replace(new RegExp("\\^", "g"), "\\^"),
    "g"
  );

  var convertDateFormat = function (format) {
    return format.replace(strftimeRegex, function (match) {
      return mapping[match];
    });
  };

  var Flatpickr = (function (Controller) {
    function Flatpickr () {
      Controller.apply(this, arguments);
    }

    if ( Controller ) Flatpickr.__proto__ = Controller;
    Flatpickr.prototype = Object.create( Controller && Controller.prototype );
    Flatpickr.prototype.constructor = Flatpickr;

    Flatpickr.prototype.initialize = function initialize () {
      this.config = {};
    };

    Flatpickr.prototype.connect = function connect () {
      this._initializeEvents();
      this._initializeOptions();
      this._initializeDateFormats();

      this.fp = flatpickr(this.element, Object.assign({}, this.config));

      this._initializeElements();
    };

    Flatpickr.prototype.disconnect = function disconnect () {
      this.fp.destroy();
    };

    Flatpickr.prototype.change = function change () {};

    Flatpickr.prototype.open = function open () {};

    Flatpickr.prototype.close = function close () {};

    Flatpickr.prototype.monthChange = function monthChange () {};

    Flatpickr.prototype.yearChange = function yearChange () {};

    Flatpickr.prototype.ready = function ready () {};

    Flatpickr.prototype.valueUpdate = function valueUpdate () {};

    Flatpickr.prototype.dayCreate = function dayCreate () {};

    Flatpickr.prototype._initializeEvents = function _initializeEvents () {
      var this$1 = this;

      events.forEach(function (event) {
        var hook = "on" + (capitalize(event));
        this$1.config[hook] = this$1[event].bind(this$1);
      });
    };

    Flatpickr.prototype._initializeOptions = function _initializeOptions () {
      var this$1 = this;

      Object.keys(options).forEach(function (optionType) {
        var optionsCamelCase = options[optionType];
        optionsCamelCase.forEach(function (option) {
          var optionKebab = kebabCase(option);
          if (this$1.data.has(optionKebab)) {
            this$1.config[option] = this$1[("_" + optionType)](optionKebab);
          }
        });
      });
    };

    Flatpickr.prototype._initializeDateFormats = function _initializeDateFormats () {
      var this$1 = this;

      dateFormats.forEach(function (dateFormat) {
        if (this$1.data.has(dateFormat)) {
          this$1.config[dateFormat] = convertDateFormat(this$1.data.get(dateFormat));
        }
      });
    };

    Flatpickr.prototype._initializeElements = function _initializeElements () {
      var this$1 = this;

      elements.forEach(function (element) {
        this$1[(element + "Target")] = this$1.fp[element];
      });
    };

    Flatpickr.prototype._string = function _string (option) {
      return this.data.get(option);
    };

    Flatpickr.prototype._date = function _date (option) {
      return this.data.get(option);
    };

    Flatpickr.prototype._boolean = function _boolean (option) {
      return this.data.get(option) === "true";
    };

    Flatpickr.prototype._array = function _array (option) {
      return JSON.parse(this.data.get(option));
    };

    Flatpickr.prototype._number = function _number (option) {
      return parseInt(this.data.get(option));
    };

    return Flatpickr;
  }(stimulus.Controller));

  return Flatpickr;

})));
//# sourceMappingURL=stimulus-flatpickr.umd.js.map
