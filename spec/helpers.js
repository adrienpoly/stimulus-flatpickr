import { Application } from "stimulus";

function registerApplication(id, controllerClass) {
  fixture.load("index.html");
  this._stimulusApp = Application.start();
  this._stimulusApp.register(id, controllerClass);
  this.controller = this._stimulusApp.controllers[0];
}

function findFlatpickr() {
  return document.querySelector(".flatpickr-calendar");
}

function fixtureQuerySelector(name) {
  return fixture.el.querySelector(`${name}`);
}

export { registerApplication, fixtureQuerySelector, findFlatpickr };
