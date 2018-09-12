import Flatpickr from "../src/stimulus-flatpickr";
import "flatpickr/dist/flatpickr.css";
import {
  registerApplication,
  addFlatpickrOption,
  resetDataAttributes
} from "./helpers";
import chai, { expect } from "chai";
import chaiDom from "chai-dom";
var controller;

const elementsSelectors = {
  calendarContainer: ".flatpickr-calendar",
  currentYearElement: ".cur-year",
  days: ".dayContainer",
  daysContainer: ".flatpickr-days",
  input: ".flatpickr-input",
  monthNav: ".flatpickr-months",
  nextMonthNav: ".flatpickr-next-month",
  prevMonthNav: ".flatpickr-prev-month",
  selectedDateElem: ".flatpickr-day.selected",
  rContainer: ".flatpickr-rContainer",
  todayDateElem: ".flatpickr-day.today",
  weekdayContainer: ".flatpickr-weekdays"
};

chai.use(chaiDom);

describe("Flatpickr Controller Target tests", function() {
  before("initialize controller", async function() {
    fixture.load("index.html");
    controller = await registerApplication("flatpickr", Flatpickr);
    await addFlatpickrOption("DefaultDate", new Date(), controller);
  });

  Object.keys(elementsSelectors).forEach(element => {
    const selector = elementsSelectors[element];
    it(`${element}Target`, async function() {
      expect(controller[`${element}Target`]).to.exist;
      expect(controller[`${element}Target`]).to.match(selector);
    });
  });
});
