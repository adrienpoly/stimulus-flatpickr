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
  "altInputClass",
  "conjunction",
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

const arrayOptions = [
  "disable",
  "enable",
  "disableDaysOfWeek",
  "enableDaysOfWeek"
];

const dateOptions = ["maxDate", "minDate", "maxTime", "minTime", "now"];

export const dateFormats = ["altFormat", "ariaDateFormat", "dateFormat"];

export const options = {
  string: stringOptions,
  boolean: booleanOptions,
  date: dateOptions,
  array: arrayOptions,
  number: numberOptions
};
