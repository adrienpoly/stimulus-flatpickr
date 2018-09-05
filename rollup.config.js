import buble from "rollup-plugin-buble";
import filesize from "rollup-plugin-filesize";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/stimulus-flatpickr.js",
  external: ["stimulus", "flatpickr"],
  output: [
    {
      file: "dist/stimulus-flatpickr.js",
      format: "cjs",
      name: "StimulusFlatpickr",
      sourcemap: true
    },
    {
      file: "dist/stimulus-flatpickr.m.js",
      format: "es",
      name: "StimulusFlatpickr",
      sourcemap: true
    },
    {
      file: "dist/stimulus-flatpickr.umd.js",
      format: "umd",
      name: "StimulusFlatpickr",
      sourcemap: true,
      globals: {
        stimulus: "Stimulus",
        flatpickr: "Flatpickr"
      }
    }
  ],
  plugins: [
    resolve(),
    buble({
      transforms: {
        classes: true
      },
      objectAssign: "Object.assign"
    }),
    filesize()
  ]
};
