import Flatpickr from "./controllers/flatpickr_controller";
import "flatpickr/dist/flatpickr.css";
import { registerController, addFlatpickrOption } from "./helpers";
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
    controller = await registerController("flatpickr", Flatpickr);
    await addFlatpickrOption("DefaultDate", new Date(), controller);
    await Promise.resolve();
  });

  Object.keys(elementsSelectors).forEach(element => {
    const selector = elementsSelectors[element];
    it(`${element}Target`, async function() {
      expect(controller[`${element}Target`]).to.exist;
      expect(controller[`${element}Target`]).to.match(selector);
    });
  });
});
