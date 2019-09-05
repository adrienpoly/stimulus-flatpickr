import { Controller } from 'stimulus';
import flatpickr from 'flatpickr';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

const kebabCase = string => string.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const booleanOptions = ["allowInput", "altInput", "animate", "clickOpens", "closeOnSelect", "disableMobile", "enableSeconds", "enableTime", "inline", "noCalendar", "shorthandCurrentMonth", "static", "time_24hr", "weekNumbers", "wrap"];
const stringOptions = ["altInputClass", "conjunction", "defaultDate", "mode", "nextArrow", "position", "prevArrow"];
const numberOptions = ["defaultHour", "defaultMinute", "defaultSeconds", "hourIncrement", "minuteIncrement", "showMonths"];
const arrayOptions = ["disable", "enable", "disableDaysOfWeek", "enableDaysOfWeek"];
const dateOptions = ["maxDate", "minDate", "maxTime", "minTime", "now"];
const dateFormats = ["altFormat", "ariaDateFormat", "dateFormat"];
const options = {
  string: stringOptions,
  boolean: booleanOptions,
  date: dateOptions,
  array: arrayOptions,
  number: numberOptions
};

const events = ["change", "open", "close", "monthChange", "yearChange", "ready", "valueUpdate", "dayCreate"];

const elements = ["calendarContainer", "currentYearElement", "days", "daysContainer", "input", "nextMonthNav", "monthNav", "prevMonthNav", "rContainer", "selectedDateElem", "todayDateElem", "weekdayContainer"];

const mapping = {
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
const strftimeRegex = new RegExp(Object.keys(mapping).join("|").replace(new RegExp("\\^", "g"), "\\^"), "g");
const convertDateFormat = format => {
  return format.replace(strftimeRegex, match => {
    return mapping[match];
  });
};

let StimulusFlatpickr =
/*#__PURE__*/
function (_Controller) {
  _inherits(StimulusFlatpickr, _Controller);

  function StimulusFlatpickr() {
    _classCallCheck(this, StimulusFlatpickr);

    return _possibleConstructorReturn(this, _getPrototypeOf(StimulusFlatpickr).apply(this, arguments));
  }

  _createClass(StimulusFlatpickr, [{
    key: "initialize",
    value: function initialize() {
      this.config = {};
    }
  }, {
    key: "connect",
    value: function connect() {
      this._initializeEvents();

      this._initializeOptions();

      this._initializeDateFormats();

      this.fp = flatpickr(this.element, { ...this.config
      });

      this._initializeElements();
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.fp.destroy();
    }
  }, {
    key: "_initializeEvents",
    value: function _initializeEvents() {
      events.forEach(event => {
        if (this[event]) {
          const hook = `on${capitalize(event)}`;
          this.config[hook] = this[event].bind(this);
        }
      });
    }
  }, {
    key: "_initializeOptions",
    value: function _initializeOptions() {
      Object.keys(options).forEach(optionType => {
        const optionsCamelCase = options[optionType];
        optionsCamelCase.forEach(option => {
          const optionKebab = kebabCase(option);

          if (this.data.has(optionKebab)) {
            this.config[option] = this[`_${optionType}`](optionKebab);
          }
        });
      });

      this._handleDaysOfWeek();
    }
  }, {
    key: "_handleDaysOfWeek",
    value: function _handleDaysOfWeek() {
      if (this.config.disableDaysOfWeek) {
        this.config.disableDaysOfWeek = this._validateDaysOfWeek(this.config.disableDaysOfWeek);
        this.config.disable = [...(this.config.disable || []), this._disable.bind(this)];
      }

      if (this.config.enableDaysOfWeek) {
        this.config.enableDaysOfWeek = this._validateDaysOfWeek(this.config.enableDaysOfWeek);
        this.config.enable = [...(this.config.enable || []), this._enable.bind(this)];
      }
    }
  }, {
    key: "_validateDaysOfWeek",
    value: function _validateDaysOfWeek(days) {
      if (Array.isArray(days)) {
        return days.map(day => parseInt(day));
      } else {
        console.error("days of week must be a valid array");
        return [];
      }
    }
  }, {
    key: "_disable",
    value: function _disable(date) {
      const disabledDays = this.config.disableDaysOfWeek;
      return disabledDays.includes(date.getDay());
    }
  }, {
    key: "_enable",
    value: function _enable(date) {
      const enabledDays = this.config.enableDaysOfWeek;
      return enabledDays.includes(date.getDay());
    }
  }, {
    key: "_initializeDateFormats",
    value: function _initializeDateFormats() {
      dateFormats.forEach(dateFormat => {
        if (this.data.has(dateFormat)) {
          this.config[dateFormat] = convertDateFormat(this.data.get(dateFormat));
        }
      });
    }
  }, {
    key: "_initializeElements",
    value: function _initializeElements() {
      elements.forEach(element => {
        this[`${element}Target`] = this.fp[element];
      });
    }
  }, {
    key: "_string",
    value: function _string(option) {
      return this.data.get(option);
    }
  }, {
    key: "_date",
    value: function _date(option) {
      return this.data.get(option);
    }
  }, {
    key: "_boolean",
    value: function _boolean(option) {
      return this.data.get(option) === "true";
    }
  }, {
    key: "_array",
    value: function _array(option) {
      return JSON.parse(this.data.get(option));
    }
  }, {
    key: "_number",
    value: function _number(option) {
      return parseInt(this.data.get(option));
    }
  }]);

  return StimulusFlatpickr;
}(Controller);

export default StimulusFlatpickr;
//# sourceMappingURL=index.m.js.map
