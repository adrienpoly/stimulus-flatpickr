import { Application } from "stimulus";
import FlatpickrController from "./controllers/flatpickr_controller";
import "flatpickr/dist/themes/dark.css";

const application = Application.start();
application.register("flatpickr", FlatpickrController);
