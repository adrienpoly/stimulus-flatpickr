import { expect } from "chai";
import { convertDateFormat } from "../src/strftime_mapping";

const testDateFormats = {
  "%Y-%m-%d": "Y-m-d",
  "%B %d, %Y": "F d, Y",
  "%b %d": "M d",
  "%d/%m/%Y": "d/m/Y",
  "%e %b": "j M",
  "%e %B %Y": "j F Y"
};

describe("strftime date conversion to Flatpickr tokens", function() {
  describe("convertDateFormat", function() {
    it("random string without % should not be changed", function() {
      const testString = "eznlen =:=:;:::; =:;fzlefnlzief &é&ééçà(!345345345)";
      expect(convertDateFormat(testString)).to.equal(testString);
    });

    Object.keys(testDateFormats).forEach(strftimeDateFormat => {
      const flatpickrDateFormat = testDateFormats[strftimeDateFormat];
      it(`strftime format ${strftimeDateFormat} to be converted to ${flatpickrDateFormat}`, function() {
        expect(convertDateFormat(strftimeDateFormat)).to.equal(
          flatpickrDateFormat
        );
      });
    });
  });
});
