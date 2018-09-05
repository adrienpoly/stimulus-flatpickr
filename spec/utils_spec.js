import { expect } from "chai";
import { kebabCase, capitalize } from "../src/utils";

describe("Utils", function() {
  describe("kebabCase", function() {
    it("test standard conversion", function() {
      expect(kebabCase("enableTime")).to.equal("enable-time");
      expect(kebabCase("EnableTime")).to.equal("enable-time");
    });

    it("test edge case such as time_24hr", function() {
      expect(kebabCase("time_24hr")).to.equal("time-24hr");
    });
  });

  describe("capitalize", function() {
    it("test standard conversion", function() {
      expect(capitalize("enableTime")).to.equal("EnableTime");
    });

    it("test edge case such as time_24hr", function() {
      expect(capitalize("time_24hr")).to.equal("Time_24hr");
    });
  });
});
