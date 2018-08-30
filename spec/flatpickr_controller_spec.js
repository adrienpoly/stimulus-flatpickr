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
  this.sandbox = sinon.createSandbox();
  this.sandbox.spy(Flatpickr.prototype, "open");
  this.sandbox.spy(Flatpickr.prototype, "valueUpdate");
  this.sandbox.spy(Flatpickr.prototype, "close");
  this.sandbox.spy(Flatpickr.prototype, "change");
  this.sandbox.spy(Flatpickr.prototype, "ready");
  registerApplication.call(this, "flatpickr", Flatpickr);
});

afterEach(function() {
  // this.sandbox.reset();
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

  it("Stimulus Flatpickr controller READY function is called", function() {
    expect(this.controller.ready).has.been.calledOnce;
  });
});

describe("When input focus", function() {
  before(function() {
    const input = fixtureQuerySelector(".flatpickr-input");
    input.dispatchEvent(new Event("focus"));
  });

  it("Flatpickr has the open class", function() {
    expect(findFlatpickr()).to.have.class("open");
  });

  it("Stimulus Flatpickr controller OPEN function is called", function() {
    expect(this.controller.open).has.been.calledOnce;
  });
});

describe("When input focus out", function() {
  before(function() {
    const focusOut = fixtureQuerySelector("#focus-out");
    console.log(focusOut);
    focusOut.dispatchEvent(new Event("click"));
    focusOut.click();
    focusOut.focus();
    document.querySelector("body").click();
  });
  document.querySelector("selector");
  it("Flatpickr has the open class", function() {
    expect(findFlatpickr()).not.to.have.class("open");
  });

  it("Stimulus Flatpickr controller OPEN function is called", function() {
    expect(this.controller.close).has.been.calledOnce;
  });
});

describe("Flatpickr options", function() {
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
