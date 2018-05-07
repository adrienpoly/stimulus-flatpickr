const booleanOptions = [
  "altInput",
  "allowInput",
  "clickOpens",
  "disableMobile",
  "enableTime",
  "enableSeconds",
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
  "dateFormat",
  "defaultDate",
  "mode",
  "nextArrow",
  "prevArrow"
];

const numberOptions = [
  "defaultHour",
  "defaultMinute",
  "hourIncrement",
  "minuteIncrement"
];

const arrayOptions = ["disable", "enable"];

const dateOptions = ["maxDate", "minDate"];

export const options = {
  string: stringOptions,
  boolean: booleanOptions,
  date: dateOptions,
  array: arrayOptions,
  number: numberOptions
};
