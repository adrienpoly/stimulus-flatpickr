import { Application } from "stimulus";

async function registerController(element, controllerType) {
  const stimulusApp = Application.start();
  stimulusApp.register(element, controllerType);

  return new Promise(resolve =>
    setTimeout(() => {
      resolve(stimulusApp.controllers[0]);
    }, 1)
  );
}

function flatpickrCalendar() {
  return document.querySelector(".flatpickr-calendar");
}

async function addFlatpickrOption(option, value, controller) {
  return new Promise(resolve => {
    const flatpickr = fixture.el.querySelector("#datepicker");
    flatpickr.dataset[`flatpickr${option}`] =
      typeof value === "object" ? JSON.stringify(value) : value;
    controller.connect();

    return setTimeout(() => {
      resolve(flatpickr);
    });
  });
}

function fixtureQuerySelector(selector) {
  return fixture.el.querySelector(selector);
}

function calendarQuerySelector(selector) {
  return document.querySelector(`.flatpickr-calendar ${selector}`);
}

async function resetDataAttributes(controller) {
  const attributes = controller.element.dataset;
  Object.keys(attributes).forEach(attribute => {
    delete controller.element.dataset[attribute];
  });
  controller.element.dataset.controller = "flatpickr";
  controller.connect();
  return Promise.resolve();
}

function beforeEachSuite(title, fn) {
  before(title, function() {
    const suites = this.test.parent.suites || [];
    suites.forEach(s => {
      s.beforeAll(fn);
      const hook = s._beforeAll.pop();
      s._beforeAll.unshift(hook);
    });
  });
}

export {
  registerController,
  fixtureQuerySelector,
  calendarQuerySelector,
  flatpickrCalendar,
  addFlatpickrOption,
  resetDataAttributes,
  beforeEachSuite
};
