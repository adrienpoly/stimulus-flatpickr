import Flatpickr from "../src/stimulus-flatpickr";
import {
  registerApplication,
  fixtureQuerySelector,
  findFlatpickr,
  addFlatpickrOption
} from "./helpers";
import chai, { expect } from "chai";
import chaiDom from "chai-dom";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(chaiDom);
chai.use(sinonChai);

before(function() {
  registerApplication.call(this, "flatpickr", Flatpickr);
  this.sandbox = sinon.createSandbox();
});

afterEach(function() {
  this.sandbox.restore();
});

describe("Initial state", function() {
  it('can find an input with the class "flatpickr-input"', function() {
    expect(fixtureQuerySelector(".flatpickr-input")).to.exist;
  });
  it('can find a div in the document with the class "flatpickr-calendar"', function() {
    expect(findFlatpickr()).to.exist;
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

describe("Add flatpickr options", function() {
  describe("disableTime", function() {
    before(function() {
      addFlatpickrOption("EnableTime", "false", this.controller);
    });
    it("cannot set time", function() {
      expect(findFlatpickr()).not.to.contain(".flatpickr-time");
    });
  });
  describe("enableTime", function() {
    before(function() {
      addFlatpickrOption("EnableTime", "true", this.controller);
    });
    it("can set time", function() {
      expect(findFlatpickr()).to.contain(".flatpickr-time");
    });
  });
  describe("disableSeconds", function() {
    before(function() {
      addFlatpickrOption("EnableSeconds", "flase", this.controller);
    });
    it("can set seconds", function() {
      expect(findFlatpickr()).not.to.contain(".flatpickr-second");
    });
  });
  describe("enableSeconds", function() {
    before(function() {
      addFlatpickrOption("EnableSeconds", "true", this.controller);
    });
    it("can set seconds", function() {
      expect(findFlatpickr()).to.contain(".flatpickr-second");
    });
  });
});
