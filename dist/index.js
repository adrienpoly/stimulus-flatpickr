'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var stimulus = require('stimulus');
var flatpickr = _interopDefault(require('flatpickr'));

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var kebabCase = function kebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
};
var capitalize = function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var booleanOptions = ['allowInput', 'altInput', 'animate', 'clickOpens', 'closeOnSelect', 'disableMobile', 'enableSeconds', 'enableTime', 'inline', 'noCalendar', 'shorthandCurrentMonth', 'static', 'time_24hr', 'weekNumbers', 'wrap'];
var stringOptions = ['altInputClass', 'conjunction', 'defaultDate', 'mode', 'nextArrow', 'position', 'prevArrow'];
var numberOptions = ['defaultHour', 'defaultMinute', 'defaultSeconds', 'hourIncrement', 'minuteIncrement', 'showMonths'];
var arrayOptions = ['disable', 'enable', 'disableDaysOfWeek', 'enableDaysOfWeek'];
var dateOptions = ['maxDate', 'minDate', 'maxTime', 'minTime', 'now'];
var dateFormats = ['altFormat', 'ariaDateFormat', 'dateFormat'];
var options = {
  string: stringOptions,
  boolean: booleanOptions,
  date: dateOptions,
  array: arrayOptions,
  number: numberOptions
};

var events = ['change', 'open', 'close', 'monthChange', 'yearChange', 'ready', 'valueUpdate', 'dayCreate'];

var elements = ['calendarContainer', 'currentYearElement', 'days', 'daysContainer', 'input', 'nextMonthNav', 'monthNav', 'prevMonthNav', 'rContainer', 'selectedDateElem', 'todayDateElem', 'weekdayContainer'];

var mapping = {
  '%Y': 'Y',
  '%y': 'y',
  '%C': 'Y',
  '%m': 'm',
  '%-m': 'n',
  '%_m': 'n',
  '%B': 'F',
  '%^B': 'F',
  '%b': 'M',
  '%^b': 'M',
  '%h': 'M',
  '%^h': 'M',
  '%d': 'd',
  '%-d': 'j',
  '%e': 'j',
  '%H': 'H',
  '%k': 'H',
  '%I': 'h',
  '%l': 'h',
  '%P': 'K',
  '%p': 'K',
  '%M': 'i',
  '%S': 'S',
  '%A': 'l',
  '%a': 'D',
  '%w': 'w'
};
var strftimeRegex = new RegExp(Object.keys(mapping).join('|').replace(new RegExp('\\^', 'g'), '\\^'), 'g');
var convertDateFormat = function convertDateFormat(format) {
  return format.replace(strftimeRegex, function (match) {
    return mapping[match];
  });
};

var StimulusFlatpickr =
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

      this.fp = flatpickr(this.element, _objectSpread2({}, this.config));

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
      var _this = this;

      events.forEach(function (event) {
        if (_this[event]) {
          var hook = "on".concat(capitalize(event));
          _this.config[hook] = _this[event].bind(_this);
        }
      });
    }
  }, {
    key: "_initializeOptions",
    value: function _initializeOptions() {
      var _this2 = this;

      Object.keys(options).forEach(function (optionType) {
        var optionsCamelCase = options[optionType];
        optionsCamelCase.forEach(function (option) {
          var optionKebab = kebabCase(option);

          if (_this2.data.has(optionKebab)) {
            _this2.config[option] = _this2["_".concat(optionType)](optionKebab);
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
        this.config.disable = [].concat(_toConsumableArray(this.config.disable || []), [this._disable.bind(this)]);
      }

      if (this.config.enableDaysOfWeek) {
        this.config.enableDaysOfWeek = this._validateDaysOfWeek(this.config.enableDaysOfWeek);
        this.config.enable = [].concat(_toConsumableArray(this.config.enable || []), [this._enable.bind(this)]);
      }
    }
  }, {
    key: "_validateDaysOfWeek",
    value: function _validateDaysOfWeek(days) {
      if (Array.isArray(days)) {
        return days.map(function (day) {
          return parseInt(day);
        });
      } else {
        console.error('days of week must be a valid array');
        return [];
      }
    }
  }, {
    key: "_disable",
    value: function _disable(date) {
      var disabledDays = this.config.disableDaysOfWeek;
      return disabledDays.includes(date.getDay());
    }
  }, {
    key: "_enable",
    value: function _enable(date) {
      var enabledDays = this.config.enableDaysOfWeek;
      return enabledDays.includes(date.getDay());
    }
  }, {
    key: "_initializeDateFormats",
    value: function _initializeDateFormats() {
      var _this3 = this;

      dateFormats.forEach(function (dateFormat) {
        if (_this3.data.has(dateFormat)) {
          _this3.config[dateFormat] = convertDateFormat(_this3.data.get(dateFormat));
        }
      });
    }
  }, {
    key: "_initializeElements",
    value: function _initializeElements() {
      var _this4 = this;

      elements.forEach(function (element) {
        _this4["".concat(element, "Target")] = _this4.fp[element];
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
      return !(this.data.get(option) == '0' || this.data.get(option) == 'false');
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
}(stimulus.Controller);

module.exports = StimulusFlatpickr;
//# sourceMappingURL=index.js.map
