// import Flatpickr from './controllers/flatpickr_hook_controller'
import { Application } from '@hotwired/stimulus'
import StimulusFlatpickr from './controllers/flatpickr_hook_controller'
import 'flatpickr/dist/flatpickr.css'
import { registerController, nextFrame, fixtureQuerySelector, addFlatpickrOption } from './helpers'
import chai, { expect } from 'chai'
import chaiDom from 'chai-dom'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
var controller, spy
const application = Application.start()

chai.use(chaiDom)
chai.use(sinonChai)

describe('Flatpickr Controller EVENTS tests', function () {
  before('initialize controller', async function () {
    fixture.load('index.html')
    this.sandbox = sinon.createSandbox()
    this.sandbox.stub(StimulusFlatpickr.prototype, 'open')
    this.sandbox.stub(StimulusFlatpickr.prototype, 'close')
    this.sandbox.stub(StimulusFlatpickr.prototype, 'ready')
    this.sandbox.stub(StimulusFlatpickr.prototype, 'monthChange')
    this.sandbox.stub(StimulusFlatpickr.prototype, 'yearChange')
    this.spyDayCreate = this.sandbox.stub(StimulusFlatpickr.prototype, 'dayCreate')
    this.spyValueUpdate = this.sandbox.stub(StimulusFlatpickr.prototype, 'valueUpdate')
    this.spyChange = this.sandbox.stub(StimulusFlatpickr.prototype, 'change')
    application.register('datepicker', StimulusFlatpickr)
    await nextFrame()
    controller = application.controllers[0]
  })

  describe('Initial state', function () {
    it('Stimulus Flatpickr controller READY function is called', function () {
      expect(controller.ready).has.been.calledOnce
      // expect(this.spyDayCreate.getCalls().length).to.be.at.least(28)
    })
  })

  describe('When focus', function () {
    it('Stimulus Flatpickr controller OPEN function is called', function () {
      const input = fixtureQuerySelector('.flatpickr-input')
      input.dispatchEvent(new Event('focus'))
      expect(controller.open).has.been.calledOnce
    })
  })

  describe('When set a new date', function () {
    it('Stimulus Flatpickr controller valueUpdate & change functions are called once', function () {
      controller.fp.setDate('2018-10-15', true, 'Y-m-d')
      expect(controller.valueUpdate).has.been.calledOnce
      expect(this.spyValueUpdate.getCall(0).args[1]).to.match(/2018-10-15/)
      expect(controller.change).has.been.calledOnce
      expect(this.spyChange.getCall(0).args[1]).to.match(/2018-10-15/)
    })
  })

  describe('When input focus out', function () {
    it('Stimulus Flatpickr controller CLOSE function is called once', function () {
      const otherInput = fixtureQuerySelector('#other-input')
      otherInput.dispatchEvent(new Event('focus'))
      expect(controller.close).has.been.calledOnce
    })
  })

  describe('When change month', function () {
    it('Stimulus Flatpickr controller monthChange() function is called once', function () {
      controller.fp.changeMonth(1)
      expect(controller.monthChange).has.been.calledOnce
    })
  })

  describe('When change year', function () {
    it('Stimulus Flatpickr controller yearChange() function is called once', function () {
      controller.fp.changeYear(1)
      expect(controller.yearChange).has.been.calledOnce
    })
  })
})
