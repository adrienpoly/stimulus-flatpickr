import Flatpickr from "../src/stimulus-flatpickr";
import "flatpickr/dist/flatpickr.css";
import {
  registerApplication,
  fixtureQuerySelector,
  calendarQuerySelector,
  flatpickrCalendar,
  addFlatpickrOption,
  resetDataAttributes
} from "./helpers";
import chai, { expect } from "chai";
import chaiDom from "chai-dom";
var controller;

chai.use(chaiDom);

describe("Flatpickr Controller tests", function() {
  before("initialize controller", async function() {
    fixture.load("index.html");
    controller = await registerApplication("flatpickr", Flatpickr);
  });

  describe("Initial state", function() {
    it('can find an input with the class "flatpickr-input"', function() {
      expect(fixtureQuerySelector(".flatpickr-input")).to.exist;
    });

    it('can find a div in the document with the class "flatpickr-calendar"', function() {
      expect(flatpickrCalendar()).to.exist;
    });

    it("does not have the class open", function() {
      expect(flatpickrCalendar()).not.to.have.class("open");
    });
  });

  describe("When input focus", function() {
    it("Flatpickr has the open class", function() {
      const input = fixtureQuerySelector(".flatpickr-input");
      input.dispatchEvent(new Event("focus"));

      expect(flatpickrCalendar()).to.have.class("open");
    });
  });

  describe("When input focus out", function() {
    it("Flatpickr does not have open class", function() {
      const otherInput = fixtureQuerySelector("#other-input");
      otherInput.dispatchEvent(new Event("focus"));

      expect(flatpickrCalendar()).not.to.have.class("open");
    });
  });

  describe("Flatpickr options with time enabled", function() {
    after(async function() {
      await resetDataAttributes(controller);
    });

    context("set enableTime false option", function() {
      it("cannot set time", async function() {
        await addFlatpickrOption("EnableTime", "false", controller);

        expect(flatpickrCalendar()).not.to.have.class("hasTime");
        expect(flatpickrCalendar()).not.to.contain(".flatpickr-time");
      });
    });

    context("set enableTime true option", function() {
      after(async function() {
        await resetDataAttributes(controller);
      });
      it("can set time", async function() {
        await addFlatpickrOption("EnableTime", "true", controller);
        expect(flatpickrCalendar()).to.have.class("hasTime");
        expect(flatpickrCalendar()).to.contain(".flatpickr-time");
      });
    });

    context("add time_24hr true option", function() {
      it("am pm are not visible", async function() {
        await addFlatpickrOption("Time-24hr", "true", controller);

        expect(flatpickrCalendar()).to.have.class("hasTime");
        expect(flatpickrCalendar()).not.to.contain(".flatpickr-am-pm");
      });
    });

    context("add enableSeconds false option", function() {
      it("cannot set seconds", async function() {
        await addFlatpickrOption("EnableSeconds", "false", controller);

        expect(flatpickrCalendar()).not.to.contain(".flatpickr-second");
      });
    });

    context("add enableSeconds true option", function() {
      it("can set seconds", async function() {
        await addFlatpickrOption("EnableSeconds", "true", controller);

        expect(flatpickrCalendar()).to.contain(".flatpickr-time");
        expect(flatpickrCalendar()).to.contain(".flatpickr-second");
      });
    });
  });

  describe("Flatpickr options with time Disabled", function() {
    after(async function() {
      // await resetDataAttributes(controller);
    });

    context("add multiMonth 2 option", function() {
      it("can see two months", async function() {
        await addFlatpickrOption("EnableTime", "false", controller);
        await addFlatpickrOption("ShowMonths", 2, controller);
        expect(flatpickrCalendar()).to.have.class("multiMonth");
      });
    });

    context("add AltInput true option", function() {
      it("can see new input field", async function() {
        expect(fixture.el).not.to.contain("input[type=hidden].flatpickr-input");
        await addFlatpickrOption("AltInput", "true", controller);
        expect(fixture.el).to.contain("input[type=hidden].flatpickr-input");
        expect(fixture.el).to.contain("input[readonly].flatpickr-input");
      });
    });

    context("add AltFormat %Y-%m-%d option", function() {
      it("can see new input field", async function() {
        await addFlatpickrOption("AltFormat", "%B %d, %Y", controller);
        controller.fp.setDate("2018-10-15");
        expect(
          calendarQuerySelector(".flatpickr-day.selected")
        ).to.have.attribute("aria-label", "October 15, 2018");

        expect(
          fixtureQuerySelector("input[type=hidden].flatpickr-input")
        ).to.have.value("2018-10-15");
        expect(controller.fp.config.dateFormat).to.equal("Y-m-d");
      });
      it("base dateFormat remains the same", async function() {
        expect(controller.fp.config.dateFormat).to.equal("Y-m-d");
      });
    });

    context("add range mode", function() {
      it("calendar has the range class", async function() {
        await addFlatpickrOption("Mode", "range", controller);
        expect(flatpickrCalendar()).to.have.class("rangeMode");
      });
    });
  });

  describe("Flatpickr dates options", function() {
    context("set min date", function() {
      it("dates before min date are disabled", async function() {
        await addFlatpickrOption("DateFormat", "Y-m-d", controller);
        await addFlatpickrOption("MinDate", "2018-10-14", controller);
        controller.fp.setDate("2018-10-15");
        expect(
          document.querySelector('span[aria-label="October 6, 2018"]')
        ).to.have.class("disabled");
      });
    });

    context("disable dates", function() {
      it("disabled dates are disabled", async function() {
        await addFlatpickrOption(
          "Disable",
          ["2018-10-14", "2018-10-17"],
          controller
        );

        expect(
          document.querySelector('span[aria-label="October 14, 2018"]')
        ).to.have.class("disabled");
      });
    });
  });
});
