const booleanOptions = [
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

const stringOptions = [
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

const numberOptions = [
  "defaultHour",
  "defaultMinute",
  "defaultSeconds",
  "hourIncrement",
  "minuteIncrement",
  "showMonths"
];

const arrayOptions = ["disable", "enable"];

const dateOptions = ["maxDate", "minDate", "maxTime", "minTime", "now"];

export const options = {
  string: stringOptions,
  boolean: booleanOptions,
  date: dateOptions,
  array: arrayOptions,
  number: numberOptions
};
