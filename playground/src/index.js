import { Application } from '@hotwired/stimulus'
import FlatpickrController from './controllers/flatpickr_controller'

const application = Application.start()
application.register('flatpickr', FlatpickrController)
