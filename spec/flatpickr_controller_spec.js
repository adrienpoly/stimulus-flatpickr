import { Application } from 'stimulus'
import chai, { expect } from 'chai'
import chaiDom from 'chai-dom'

import StimulusFlatpickr from './controllers/flatpickr_controller'
import { nextFrame, fixtureQuerySelector, flatpickrCalendar, addFlatpickrOption, beforeEachSuite } from './helpers'

import 'flatpickr/dist/flatpickr.css'

var controller

const application = Application.start()

chai.use(chaiDom)

describe('Flatpickr Controller tests', function() {
  beforeEachSuite('initialize controller', async function() {
    fixture.load('index.html')
    application.register('datepicker', StimulusFlatpickr)
    await nextFrame()
    controller = application.controllers[0]
  })

  describe('Initial state', function() {
    it('Stimulus flatpickr controller is initialized', function() {
      expect(controller).to.exist
    })

    it('can find an input with the class "flatpickr-input"', function() {
      expect(fixtureQuerySelector('.flatpickr-input')).to.exist
    })

    it('can find a div in the document with the class "flatpickr-calendar"', function() {
      expect(flatpickrCalendar()).to.exist
    })

    it('does not have the class open', function() {
      expect(flatpickrCalendar()).not.to.have.class('open')
    })
  })

  describe('When input focus', function() {
    it('Flatpickr has the open class', async function() {
      const input = fixtureQuerySelector('.flatpickr-input')
      input.dispatchEvent(new Event('focus'))
      await nextFrame()

      expect(flatpickrCalendar()).to.have.class('open')
    })
  })

  describe('When input focus out', function() {
    it('Flatpickr does not have open class', function() {
      controller.fp.open()
      const otherInput = fixtureQuerySelector('#other-input')
      otherInput.dispatchEvent(new Event('focus'))

      expect(flatpickrCalendar()).not.to.have.class('open')
    })
  })

  describe('Flatpickr options with time enabled', function() {
    context('set enableTime false option', function() {
      it('cannot set time', async function() {
        addFlatpickrOption('EnableTime', 'false', controller)
        await nextFrame()

        expect(flatpickrCalendar()).not.to.have.class('hasTime')
        expect(flatpickrCalendar()).not.to.contain('.flatpickr-time')
      })
    })

    context('set enableTime true option', function() {
      it('can set time', async function() {
        addFlatpickrOption('EnableTime', 'true', controller)
        await nextFrame()

        expect(flatpickrCalendar()).to.have.class('hasTime')
        expect(flatpickrCalendar()).to.contain('.flatpickr-time')
      })
    })

    context('add time_24hr true option', function() {
      it('am pm are not visible', async function() {
        addFlatpickrOption('Time-24hr', 'true', controller)
        await nextFrame()

        expect(flatpickrCalendar()).to.have.class('hasTime')
        expect(flatpickrCalendar()).not.to.contain('.flatpickr-am-pm')
      })
    })

    context('add enableSeconds false option', function() {
      it('cannot set seconds', async function() {
        addFlatpickrOption('EnableSeconds', 'false', controller)
        await nextFrame()

        expect(flatpickrCalendar()).not.to.contain('.flatpickr-second')
      })
    })

    context('add enableSeconds true option', function() {
      it('can set seconds', async function() {
        addFlatpickrOption('EnableSeconds', 'true', controller)
        await nextFrame()

        expect(flatpickrCalendar()).to.contain('.flatpickr-time')
        expect(flatpickrCalendar()).to.contain('.flatpickr-second')
      })
    })
  })

  describe('Flatpickr options with time Disabled', function() {
    context('add multiMonth 2 option', function() {
      it('can see two months', async function() {
        addFlatpickrOption('EnableTime', 'false', controller)
        addFlatpickrOption('ShowMonths', 2, controller)
        await nextFrame()

        expect(flatpickrCalendar()).to.have.class('multiMonth')
      })
    })

    context('add AltFormat %Y-%m-%d option', function() {
      it('can see new input field', async function() {
        addFlatpickrOption('AltFormat', '%B %d, %Y', controller)
        addFlatpickrOption('DefaultDate', '2018-10-15', controller)
        await nextFrame()

        expect(controller.selectedDateElemTarget).to.have.attribute('aria-label', 'October 15, 2018')
        expect(controller.inputTarget).to.have.value('2018-10-15')
      })

      it('base dateFormat remains the same', function() {
        expect(controller.fp.config.dateFormat).to.equal('Y-m-d')
      })
    })

    context('add range mode', function() {
      it('calendar has the range class', function() {
        addFlatpickrOption('Mode', 'range', controller)
        expect(flatpickrCalendar()).to.have.class('rangeMode')
      })
    })
  })

  describe('Flatpickr disable dates options', function() {
    before(async function() {
      controller.fp.setDate('2018-10-15')
      addFlatpickrOption('DateFormat', 'Y-m-d', controller)
      addFlatpickrOption('DefaultDate', '2018-10-15', controller)
      await nextFrame()
    })

    context('set min date', function() {
      it('dates before min date are disabled', async function() {
        addFlatpickrOption('MinDate', '2018-10-03', controller)
        await nextFrame()

        expect(document.querySelector('span[aria-label="October 2, 2018"]')).to.have.class('flatpickr-disabled')
      })
    })

    context('disable dates', function() {
      it('disabled individual dates are disabled', async function() {
        addFlatpickrOption('Disable', ['2018-10-14', '2018-10-17'], controller)
        await nextFrame()

        expect(document.querySelector('span[aria-label="October 14, 2018"]')).to.have.class('flatpickr-disabled')
      })

      it('add disable days of week all sundays are disabled', async function() {
        addFlatpickrOption('DisableDaysOfWeek', [6], controller)
        await nextFrame()

        expect(document.querySelector('span[aria-label="October 6, 2018"]')).to.have.class('flatpickr-disabled')
        expect(document.querySelector('span[aria-label="October 13, 2018"]')).to.have.class('flatpickr-disabled')
      })
    })
  })

  describe('Flatpickr enable dates options', function() {
    before(async function() {
      controller.fp.setDate('2018-10-15')
      addFlatpickrOption('DateFormat', 'Y-m-d', controller)
      addFlatpickrOption('DefaultDate', '2018-10-15', controller)
      await nextFrame()
    })

    it('enable individual dates are enabled', async function() {
      addFlatpickrOption('Enable', ['2018-10-14', '2018-10-17'], controller)
      addFlatpickrOption('DefaultDate', '2018-10-14', controller)
      await nextFrame()

      expect(document.querySelector('span[aria-label="October 14, 2018"]')).not.to.have.class('flatpickr-disabled')
    })

    it('add enable days of week only mondays are enabled', async function() {
      addFlatpickrOption('EnableDaysOfWeek', [1], controller)
      await nextFrame()

      expect(document.querySelector('span[aria-label="October 8, 2018"]')).not.to.have.class('flatpickr-disabled')
      expect(document.querySelector('span[aria-label="October 15, 2018"]')).not.to.have.class('flatpickr-disabled')
      expect(document.querySelector('span[aria-label="October 14, 2018"]')).not.to.have.class('flatpickr-disabled')
    })
  })

  describe('Flatpickr enable days of week only', function() {
    it('add enable days of week', async function() {
      addFlatpickrOption('EnableDaysOfWeek', [1], controller)
      await nextFrame()

      const enabledDays = controller.daysTarget.querySelectorAll('span.flatpickr-day:not(.flatpickr-disabled)')
      expect(enabledDays.length).to.be.within(4, 6)
    })
  })

  describe('Flatpickr disable days of week only', function() {
    it('add disable days of week', async function() {
      addFlatpickrOption('DisableDaysOfWeek', [1], controller)
      await nextFrame()

      const disabledDays = controller.daysTarget.querySelectorAll('span.flatpickr-day.flatpickr-disabled')
      expect(disabledDays.length).to.be.within(4, 6)
    })
  })

  describe('Flatpickr disable days test with invalid entries', function() {
    context("don't provide an array", function() {
      it('it still work and no days are disabled', async function() {
        addFlatpickrOption('DisableDaysOfWeek', 1, controller)
        await nextFrame()

        const disabledDays = controller.daysTarget.querySelectorAll('span.flatpickr-day.flatpickr-disabled')
        expect(controller).to.exist
        expect(disabledDays.length).to.equal(0)
      })
    })

    context('provide an array of string', function() {
      it('it is the same as an array of integer', async function() {
        addFlatpickrOption('DisableDaysOfWeek', ['1'], controller)
        await nextFrame()

        const disabledDays = controller.daysTarget.querySelectorAll('span.flatpickr-day.flatpickr-disabled')
        expect(controller).to.exist
        expect(disabledDays.length).to.be.within(4, 6)
      })
    })
  })

  describe('Flatpickr enable days test with invalid entries', function() {
    context("don't provide an array", function() {
      it('it still work and all days are disabled', async function() {
        addFlatpickrOption('EnableDaysOfWeek', 1, controller)
        await nextFrame()

        const disabledDays = controller.daysTarget.querySelectorAll('span.flatpickr-day.flatpickr-disabled')
        expect(controller).to.exist
        expect(disabledDays.length).to.be.at.least(30)
      })
    })
  })

  describe('Boolean options can be true/false or 1/0', function() {
    it('accpet 1 as a true value', async function() {
      addFlatpickrOption('EnableTime', 1, controller)
      await nextFrame()

      expect(controller._boolean('enable-time')).to.be.true
    })

    it('accept "true" as a true value', async function() {
      addFlatpickrOption('EnableTime', 'true', controller)
      await nextFrame()

      expect(controller._boolean('enable-time')).to.be.true
    })

    it('accept 0 as a false value', async function() {
      addFlatpickrOption('EnableTime', 0, controller)
      await nextFrame()

      expect(controller._boolean('enable-time')).to.be.false
    })

    it('accept "false" as a false value', async function() {
      addFlatpickrOption('EnableTime', 'false', controller)
      await nextFrame()

      expect(controller._boolean('enable-time')).to.be.false
    })
  })
})
