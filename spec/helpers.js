import { Application } from 'stimulus'

const nextFrame = async () => {
  return new Promise((resolve) => requestAnimationFrame(resolve))
}

async function registerController(element, controllerType) {
  const stimulusApp = Application.start()
  stimulusApp.register(element, controllerType)

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(stimulusApp.controllers[0])
    })
  )
}

function flatpickrCalendar() {
  return document.querySelector('.flatpickr-calendar')
}

function addFlatpickrOption(option, value, controller) {
  const flatpickr = fixture.el.querySelector('#datepicker')
  flatpickr.dataset[`datepicker${option}`] = typeof value === 'object' ? JSON.stringify(value) : value
  controller.connect()
  // await nextFrame()
}

function fixtureQuerySelector(selector) {
  return fixture.el.querySelector(selector)
}

function calendarQuerySelector(selector) {
  return document.querySelector(`.flatpickr-calendar ${selector}`)
}

function resetDataAttributes(controller) {
  const attributes = controller.element.dataset
  Object.keys(attributes).forEach((attribute) => {
    delete controller.element.dataset[attribute]
  })
  controller.element.dataset.controller = 'flatpickr'
  controller.connect()
}

function beforeEachSuite(title, fn) {
  before(title, function() {
    const suites = this.test.parent.suites || []
    suites.forEach((s) => {
      s.beforeAll(fn)
      const hook = s._beforeAll.pop()
      s._beforeAll.unshift(hook)
    })
  })
}

export {
  registerController,
  fixtureQuerySelector,
  calendarQuerySelector,
  flatpickrCalendar,
  addFlatpickrOption,
  resetDataAttributes,
  beforeEachSuite,
  nextFrame
}
