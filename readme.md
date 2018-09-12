<h1 align="center">📆 Stimulus-Flatpickr Wrapper</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/stimulus-flatpickr" rel="nofollow">
    <img src="https://badge.fury.io/js/stimulus-flatpickr.svg" alt="npm version">
  </a>
  <a href="https://circleci.com/gh/adrienpoly/stimulus-flatpickr" rel="nofollow">
  <img src="https://circleci.com/gh/adrienpoly/stimulus-flatpickr.svg?style=svg" alt="CircleCi build status">
  </a>
  <a href="https://codecov.io/gh/adrienpoly/stimulus-flatpickr">
    <img src="https://codecov.io/gh/adrienpoly/stimulus-flatpickr/branch/master/graph/badge.svg" alt="Coverage"/>
  </a>
</p>

<p align="center">
  <b>Modest yet powerful wrapper of Flatpickr for Stimulus</b></br>
  <sub>Only ~1kb <sub>
</p>

<br />

- **Simple**: create advanced datepickers with less code
- **Backend Friendly**: easily pass backend information to the datepicker (locals, availabilities, date formats etc)
- **strftime friendly**: [converts automatically strftime](#date-and-time-formats) formats to flatpickr formating tokens
- **Turbolinks**: make all your datepickers compatible with Turbolinks by design
- **Getters**: all Flatpickr elements are available as [targets](#elements)
- **Events/hooks**: all flatpickr [events/hooks](#callbacks) are directly available in your Stimulus Controller.
- **Example**: [detailed example](#example) for adavanced usage of flatpickr
- **MIT Licensed**: free for personal and commercial use

## A modest wrapper of Flatpickr for Stimulus

By using this wrapper of [Flatpickr](http://flatpickr.js.org/) for [Stimulus](https://stimulusjs.org/) you can make all configurations for the Datepicker directly with the `data-attributes` of the HTML. This makes it very handy to create datepicker with server generate html and pass information from the backend to the datepicker.

Here is a simple example:

```html+erb
<%= form_with model: Appointement.new, authenticity_token: true do |f| %>
  <%= f.text_field :start_time,
    data: {
      controller: "flatpickr",
      flatpickr_min_date: Time.zone.now #disables past dates
    } %>
<% end %>
```

<p align="center">
  👇👇👇👇👇👇
</p>
<p align="center">
  <img src="./images/datetime-picker.png" alt="datetime picker result">
</p>

## Example

An example of a Rails app showcasing

- localization of the datepicker 🌍
- localization of the date formats 🌍
- availabilities in the date picker 📅
- Fully boosted with Turbolinks 🚀

is available here : [Rails Stimulus Flatpickr](https://github.com/adrienpoly/rails_stimulus_flatpickr)

## Install

This assumes that you have [Stimulus](https://stimulusjs.org/handbook/installing) already installed.

In your project just add the `stimulus-flatpickr` package.

```bash
$ yarn add stimulus-flatpickr
```

or

```bash
$ npm i stimulus-flatpickr
```

## Basic usage

If you only need to convert an input field in a DateTime picker, you just need to register a standard Stimulus controller and add some markup to your input field.

### Register a Flatpickr Controller

manually register a new Stimulus controller in your main JS entry point.

```js
// ./packs/application.js
import { Application } from "stimulus";
// import Flatpickr
import Flatpickr from "stimulus-flatpickr";

import { definitionsFromContext } from "stimulus/webpack-helpers";
const application = Application.start();
const context = require.context("../controllers", true, /\.js$/);
application.load(definitionsFromContext(context));

// Manually register Flatpickr as a stimulus controller
application.register("flatpickr", Flatpickr);
```

### Using it with Rails

You can now create forms and input fields easily by adding a `data-controller="flatpickr"` attribute to the input fields and pass [options](https://flatpickr.js.org/options/) with the Stimulus Controller states : `data-flatpickr-the-option`.

```html+erb
<%= form_with model: Appointement.new, authenticity_token: true do |f| %>
  <%= f.text_field :start_time,
    data: {
      controller: "flatpickr",
      flatpickr_format: "Y-m-d",
      flatpickr_min_date: Time.zone.now
    } %>
<% end %>
```

<p align="center">
  👇👇👇👇👇👇
</p>
<p align="center">
  <img src="./images/datetime-picker.png" alt="datetime picker result">
</p>

### Options & conventions

All options for Flatpickr can be found [here](https://flatpickr.js.org/options/).

All options are in `camelCase` (JS) and must be converted to `lower_snake_case` in the `data-attribute`. `lower_snake_case` is automatically converted to `kebab-case` when rails render the HTML.

```erb
<%= f.text_field :start_time,
  data: {
    controller: "flatpickr",
    flatpickr_enable_time: true
  }
} %>
```

will output this HTML:

```html
<input data-controller="flatpickr" data-flatpickr-enable-time="true" type="text" name="appointement[start_time]" >
```

### HTML markup

If you are not using Rails or simply wants to markup your HTML directly, simply add a `html data-controller="flatpickr"` to your input field and some options `html data-flatpickr-some-option="value"` options must be converted from `camelCase` to `kebab-case`

## Advanced Usage

If you need more than just displaying the standard DateTime picker, then you can extend the `stimulus-flatpickr` wrapper controller. This is necessary when you need to:

- set a custom language
- create customs callbacks
- perform JS business logic

**Skip basics installation steps from above!**

### Extends the controller

create a new Stimulus controller that will inherit from `stimulus-flatpickr`

```js
// ./controllers/flatpickr_controller.js
// import stimulus-flatpickr wrapper controller to extend it
import Flatpickr from "stimulus-flatpickr";

// you can also import a translation file
import { French } from "flatpickr/dist/l10n/fr.js";

// import a theme (could be in your main CSS entry too...)
import "flatpickr/dist/themes/dark.css";

// create a new Stimulus controller by extending stimulus-flatpickr wrapper controller
export default class extends Flatpickr {
  initialize() {
    // sets your language (you can also set some global setting for all time pickers)
    this.config = {
      locale: French
    };
  }

  // all flatpickr hooks are available as callbacks in your Stimulus controller
  change(selectedDates, dateStr, instance) {
    console.log("the callback returns the selected dates", selectedDates);
    console.log("but returns it also as a string", dateStr);
    console.log("and the flatpickr instance", instance);
  }
}
```

### Global settings for all datepickers

As we have seen just above you can easily from your rails `erb` code pass the flatpickr options. This is great for passing dynamic options that might change (ie enableDate, dateFormat etc).

If all your datepickers share some global settings you can define them in your `initialize()` or `connect()` function.

```js
initialize() {
   //global options
    this.config = {
      enableTime: true,
      time_24hr: true
    };
  }
```

or with `connect()`

```js
connect() {
   //global options
    this.config = {
      ...this.config, //spread options in case some where defined in initialize
      enableTime: true,
      time_24hr: true
    };

    //always call super.connect()
    super.connect();
  }
```

### HTML markup

Then in the same way as above you can now create forms and input fields easily by adding a `data-controller="flatpickr"` attribute to the input fields and pass [options](https://flatpickr.js.org/options/) with the Stimulus Controller states : `data-flatpick-the-option`.

```html+erb
<%= form_with model: Appointement.new, authenticity_token: true do |f| %>
  <%= f.text_field :start_time,
    data: {
      controller: "flatpickr",
      flatpickr_format: "Y-m-d",
      flatpickr_min_date: Time.zone.now
    } %>
<% end %>
```

<p align="center">
  👇👇👇👇👇👇
</p>
<p align="center">
  <img src="./images/datetime-picker-black-fr.png" alt="datetime picker result">
</p>

### Date and Time formats

Flatpickr has custom [formatting tokens](https://flatpickr.js.org/formatting/). in Rails (and other backends) formats are based on `strftime` standard.

This package automatically converts `strftime` datetime formats to the nearest Flatpickr format.

With this solution, it becomes handy to localize your date formats. `t("date.formats.long")` outputs `"%B %d, %Y"`for the local `:en` and it outputs `"%e %B %Y"` for the locale `:fr`.

```erb
<%= form_with model: appointment do |f| %>
  <%= f.text_field :start_at,
      data: {
        controller: "flatpickr",
        flatpickr_alt_format: t("date.formats.long"),
        flatpickr_alt_input: true,
        flatpickr_min_date: Time.zone.now,
      } %>
<% end %>
```

<p align="center">
  👇👇👇👇👇👇
</p>
<p align="center">
  <img src="./images/datetime-picker-formats.png" alt="datetime picker result">
</p>

### Callbacks

All Flatpickr [events/hooks](https://flatpickr.js.org/events/) are available as callbacks in the extended controller as demonstrated above for the `onChange` hook.

Just add the function to your Stimulus Controller in `camelCase` without `on`.

`onChange` -> `change(){}`

### Instance and its methods

You can access the flatpickr instance from your Stimulus controller by calling `this.fp`. Also, the instance methods are available through this instance call.

```javascript
yourFunction () {
  // ...
  this.fp.clear()
  this.fp.close()
}
```

### Getters

#### Elements

In your controller you can access the Flapickr [elements](https://flatpickr.js.org/instance-methods-properties-elements/#elements) using some Stimulus like targets.

`this.calendarContainerTarget` : Self-explanatory. This is the div.flatpickr-calendar element.

`this.currentYearElementTarget`: The input holding the current year.

`this.daysTarget` : The container for all the day elements.

`this.daysContainerTarget` : The container for all the day elements.

`this.inputTarget` : The text input element associated with flatpickr.

`this.nextMonthNavTarget` : The “right arrow” element responsible for incrementing the current month.

`this.monthNavTarget` : The container with the month navigation.

`this.prevMonthNavTarget` : The “left arrow” element responsible for decrementing the current month.

`this.selectedDateElem`: the selected date element.

`todayDateElem`: today element.

`weekdayContainer`: the container we all the days of the week.

## Overriding connect & disconnect

if you need to override the connect function in the extended controller, you need to call `super`

```js
connect(){
  // ...
  // define global settings as explained in the global settings section before super
  // ...

  // always call super.connect()
  super.connect();

  // ...
  // Your code can access this.fp flatpickr instance
  // ...
}
```

## CSS

This wrapper does not include any CSS. Flatpickr CSS should be loaded separately from the main Flatpickr package as you would normally do.

## Contributing

Bug reports and pull requests are welcome.

**To contribute:**

Fork the project.

Install dependencies

`$ yarn install`

Start the test watcher

`$ yarn test:watch`

Running one-off test runs can be done with:

`$ yarn test`

You can test locally also the results with the playground project [./playground](./playground/readme.md)

**Then :**

👍 Write some tests

💪 Add your feature

🚀 Send a PR

## License

This package is available as open source under the terms of the MIT License.
