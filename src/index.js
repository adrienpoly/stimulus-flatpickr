import { Controller } from 'stimulus'
import flatpickr from 'flatpickr'
import { kebabCase, capitalize } from './utils'
import { options, dateFormats } from './config_options'
import { events } from './events'
import { elements } from './elements'
import { convertDateFormat } from './strftime_mapping'

class StimulusFlatpickr extends Controller {
  static targets = ['instance']

  initialize() {
    this.config = {}
  }

  connect() {
    this._initializeEvents()
    this._initializeOptions()
    this._initializeDateFormats()

    this.fp = flatpickr(this.flatpickrElement, {
      ...this.config
    })

    this._initializeElements()
  }

  disconnect() {
    const value = this.inputTarget.value
    this.fp.destroy()
    this.inputTarget.value = value
  }

  _initializeEvents() {
    events.forEach((event) => {
      if (this[event]) {
        const hook = `on${capitalize(event)}`
        this.config[hook] = this[event].bind(this)
      }
    })
  }

  _initializeOptions() {
    Object.keys(options).forEach((optionType) => {
      const optionsCamelCase = options[optionType]
      optionsCamelCase.forEach((option) => {
        const optionKebab = kebabCase(option)
        if (this.data.has(optionKebab)) {
          this.config[option] = this[`_${optionType}`](optionKebab)
        }
      })
    })
    this._handleDaysOfWeek()
  }

  _handleDaysOfWeek() {
    if (this.config.disableDaysOfWeek) {
      this.config.disableDaysOfWeek = this._validateDaysOfWeek(this.config.disableDaysOfWeek)
      this.config.disable = [...(this.config.disable || []), this._disable.bind(this)]
    }

    if (this.config.enableDaysOfWeek) {
      this.config.enableDaysOfWeek = this._validateDaysOfWeek(this.config.enableDaysOfWeek)
      this.config.enable = [...(this.config.enable || []), this._enable.bind(this)]
    }
  }

  _validateDaysOfWeek(days) {
    if (Array.isArray(days)) {
      return days.map((day) => parseInt(day))
    } else {
      console.error('days of week must be a valid array')
      return []
    }
  }

  _disable(date) {
    const disabledDays = this.config.disableDaysOfWeek
    return disabledDays.includes(date.getDay())
  }

  _enable(date) {
    const enabledDays = this.config.enableDaysOfWeek
    return enabledDays.includes(date.getDay())
  }

  _initializeDateFormats() {
    dateFormats.forEach((dateFormat) => {
      if (this.data.has(dateFormat)) {
        this.config[dateFormat] = convertDateFormat(this.data.get(dateFormat))
      }
    })
  }

  _initializeElements() {
    elements.forEach((element) => {
      this[`${element}Target`] = this.fp[element]
    })
  }

  _string(option) {
    return this.data.get(option)
  }

  _date(option) {
    return this.data.get(option)
  }

  _boolean(option) {
    return !(this.data.get(option) == '0' || this.data.get(option) == 'false')
  }

  _array(option) {
    return JSON.parse(this.data.get(option))
  }

  _number(option) {
    return parseInt(this.data.get(option))
  }

  _arrayOrString(option) {
    const val = this.data.get(option)
    try {
      return JSON.parse(val)
    } catch (e) {
      return val
    }
  }

  get flatpickrElement() {
    return (this.hasInstanceTarget && this.instanceTarget) || this.element
  }
}

export default StimulusFlatpickr
