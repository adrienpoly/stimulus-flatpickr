import { convertDateFormat } from '../src/strftime_mapping'
import { expect } from 'chai'

const testDateFormats = {
  '%Y-%m-%d': 'Y-m-d',
  '%B %d, %Y': 'F d, Y',
  '%b %d': 'M d',
  '%d/%m/%Y': 'd/m/Y',
  '%e %b': 'j M',
  '%e %B %Y': 'j F Y'
}

const mapping = {
  '%Y': 'Y',
  '%y': 'y',
  '%C': 'Y',
  '%m': 'm',
  '%-m': 'n',
  '%_m': 'n',
  '%B': 'F',
  '%^B': 'F',
  '%b': 'M',
  '%^b': 'M',
  '%h': 'M',
  '%^h': 'M',
  '%d': 'd',
  '%-d': 'j',
  '%e': 'j',
  '%H': 'H',
  '%k': 'H',
  '%I': 'h',
  '%l': 'h',
  '%-l': 'h',
  '%P': 'K',
  '%p': 'K',
  '%M': 'i',
  '%S': 'S',
  '%A': 'l',
  '%a': 'D',
  '%w': 'w'
}

describe('strftime date conversion to Flatpickr tokens', function() {
  context('convertDateFormat', function() {
    it('random string without % should not be changed', function() {
      const testString = 'eznlen =:=:;:::; =:;fzlefnlzief &é&ééçà(!345345345)'
      expect(convertDateFormat(testString)).to.equal(testString)
    })

    Object.keys(testDateFormats).forEach((strftimeDateFormat) => {
      const flatpickrDateFormat = testDateFormats[strftimeDateFormat]
      it(`strftime format ${strftimeDateFormat} to be converted to ${flatpickrDateFormat}`, function() {
        expect(convertDateFormat(strftimeDateFormat)).to.equal(flatpickrDateFormat)
      })
    })

    it('strftime format to be converted to', function() {
      Object.keys(mapping).forEach((strftimeDateFormat) => {
        const flatpickrDateFormat = mapping[strftimeDateFormat]
        expect(convertDateFormat(strftimeDateFormat)).to.equal(flatpickrDateFormat)
      })
    })
  })
})
