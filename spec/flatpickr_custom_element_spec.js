import { Application } from '@hotwired/stimulus'
import chai, { expect } from 'chai'
import chaiDom from 'chai-dom'

import StimulusFlatpickr from './controllers/flatpickr_controller'
import { nextFrame, beforeEachSuite } from './helpers'

import 'flatpickr/dist/flatpickr.css'

var controller

const application = Application.start()

chai.use(chaiDom)

describe('Flatpickr Custom element Controller tests', function() {
  beforeEachSuite('initialize controller', async function() {
    fixture.load('index-custom.html')
    application.register('datepicker', StimulusFlatpickr)
    await nextFrame()
    controller = application.controllers[0]
  })

  describe('Initial state', function() {
    it('Stimulus flatpickr controller is initialized', function() {
      expect(controller).to.exist
    })

    it('flatpickr instance exists', function() {
      expect(controller.fp).to.exist
    })
  })
})
