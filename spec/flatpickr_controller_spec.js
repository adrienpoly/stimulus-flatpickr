import Flatpickr from "../src/stimulus-flatpickr";
import {
  registerApplication,
  fixtureQuerySelector,
  findFlatpickr
} from "./helpers";
import chai, { expect } from "chai";
import chaiDom from "chai-dom";
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
  });
});
