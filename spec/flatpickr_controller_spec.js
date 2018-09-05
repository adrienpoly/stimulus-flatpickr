import Flatpickr from "../src/stimulus-flatpickr";
import "flatpickr/dist/flatpickr.css";
import {
  registerApplication,
  fixtureQuerySelector,
  findFlatpickr,
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

  after("disconnect controller", function() {
    resetDataAttributes(controller);
    controller.disconnect();
  });

  describe("Initial state", function() {
    it('can find an input with the class "flatpickr-input"', function() {
      expect(fixtureQuerySelector(".flatpickr-input")).to.exist;
    });

    it('can find a div in the document with the class "flatpickr-calendar"', function() {
      expect(findFlatpickr()).to.exist;
    });

    it("does not have the class open", function() {
      expect(findFlatpickr()).not.to.have.class("open");
    });
  });

  describe("When input focus", function() {
    it("Flatpickr has the open class", function() {
      const input = fixtureQuerySelector(".flatpickr-input");
      input.dispatchEvent(new Event("focus"));

      expect(findFlatpickr()).to.have.class("open");
    });
  });

  describe("When input focus out", function() {
    it("Flatpickr does not have open class", function() {
      const otherInput = fixtureQuerySelector("#other-input");
      otherInput.dispatchEvent(new Event("focus"));

      expect(findFlatpickr()).not.to.have.class("open");
    });
  });

  describe("Flatpickr options", function() {
    context("set enableTime false option", function() {
      it("cannot set time", async function() {
        await addFlatpickrOption("EnableTime", "false", controller);

        expect(findFlatpickr()).not.to.have.class("hasTime");
        expect(findFlatpickr()).not.to.contain(".flatpickr-time");
      });
    });

    context("set enableTime true option", function() {
      after(async function() {
        await resetDataAttributes(controller);
      });
      it("can set time", async function() {
        await addFlatpickrOption("EnableTime", "true", controller);

        expect(findFlatpickr()).to.have.class("hasTime");
        expect(findFlatpickr()).to.contain(".flatpickr-time");
      });
    });

    context("add time_24hr true option", function() {
      it("am pm are not visible", async function() {
        await addFlatpickrOption("Time-24hr", "true", controller);

        expect(findFlatpickr()).to.have.class("hasTime");
        expect(findFlatpickr()).not.to.contain(".flatpickr-am-pm");
      });
    });

    context("add enableSeconds false option", function() {
      it("cannot set seconds", async function() {
        await addFlatpickrOption("EnableSeconds", "false", controller);

        expect(findFlatpickr()).not.to.contain(".flatpickr-second");
      });
    });

    describe("add enableSeconds true option", function() {
      it("can set seconds", async function() {
        await addFlatpickrOption("EnableSeconds", "true", controller);

        expect(findFlatpickr()).to.contain(".flatpickr-time");
        expect(findFlatpickr()).to.contain(".flatpickr-second");
      });
    });
  });
});
