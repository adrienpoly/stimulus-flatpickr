import { Application } from "stimulus";

async function registerApplication(id, controllerClass) {
  const stimulusApp = Application.start();
  stimulusApp.register(id, controllerClass);
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(stimulusApp.controllers[0]);
    })
  );
}

function findFlatpickr() {
  return document.querySelector(".flatpickr-calendar");
}

function addFlatpickrOption(option, value, controller) {
  return new Promise(resolve => {
    const flatpickr = fixture.el.querySelector("#datepicker");
    flatpickr.dataset[`flatpickr${option}`] = value;
    controller.connect();
    resolve(flatpickr);
  });
}

function fixtureQuerySelector(name) {
  return fixture.el.querySelector(`${name}`);
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

function beforeEachSuite(fn) {
  before(function() {
    const suites = this.test.parent.suites || [];
    suites.forEach(s => {
      s.beforeAll(fn);
      const hook = s._beforeAll.pop();
      s._beforeAll.unshift(hook);
    });
  });
}

export {
  registerApplication,
  fixtureQuerySelector,
  findFlatpickr,
  addFlatpickrOption,
  resetDataAttributes,
  beforeEachSuite
};
