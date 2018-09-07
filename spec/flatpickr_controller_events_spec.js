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
import sinon from "sinon";
import sinonChai from "sinon-chai";
var controller, spy;

chai.use(chaiDom);
chai.use(sinonChai);

describe("Flatpickr Controller EVENTS tests", function() {
  before("initialize controller", async function() {
    fixture.load("index.html");
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(Flatpickr.prototype, "open");
    this.sandbox.stub(Flatpickr.prototype, "close");
    this.sandbox.stub(Flatpickr.prototype, "ready");
    this.spyDayCreate = this.sandbox.stub(Flatpickr.prototype, "dayCreate");
    this.spyValueUpdate = this.sandbox.stub(Flatpickr.prototype, "valueUpdate");
    this.spyChange = this.sandbox.stub(Flatpickr.prototype, "change");
    controller = await registerApplication("flatpickr", Flatpickr);
  });

  after(async function() {
    controller.disconnect();
    this.sandbox.restore();
    await Promise.resolve();
  });

  describe("Initial state", function() {
    it("Stimulus Flatpickr controller READY function is called", function() {
      expect(controller.ready).has.been.calledOnce;
      expect(this.spyDayCreate.getCalls().length).to.be.at.least(28);
    });
  });

  describe("When focus", function() {
    it("Stimulus Flatpickr controller OPEN function is called", function() {
      const input = fixtureQuerySelector(".flatpickr-input");
      input.dispatchEvent(new Event("focus"));
      expect(controller.open).has.been.calledOnce;
    });
  });

  describe("When set a new date", function() {
    it("Stimulus Flatpickr controller valueUpdate & change functions are called once", function() {
      controller.fp.setDate("2018-10-15", true, "Y-m-d");
      expect(controller.valueUpdate).has.been.calledOnce;
      expect(this.spyValueUpdate.getCall(0).args[1]).to.be.equal("2018-10-15");
      expect(controller.change).has.been.calledOnce;
      expect(this.spyChange.getCall(0).args[1]).to.be.equal("2018-10-15");
    });
  });

  describe("When input focus out", function() {
    it("Stimulus Flatpickr controller CLOSE function is called once", function() {
      const otherInput = fixtureQuerySelector("#other-input");
      otherInput.dispatchEvent(new Event("focus"));
      expect(controller.close).has.been.calledOnce;
    });
  });
});
