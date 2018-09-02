import Flatpickr from "../../dist/stimulus-flatpickr.js";

export default class extends Flatpickr {
  connect() {
    this.config = {};

    super.connect();
  }
}
