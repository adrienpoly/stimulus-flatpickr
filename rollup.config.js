import resolve from "rollup-plugin-node-resolve";
import buble from "rollup-plugin-buble";
import filesize from "rollup-plugin-filesize";

export default {
  input: "src/stimulus-flatpickr.js",
  external: ["stimulus", "flatpickr"],
  output: [
    {
      file: "dist/stimulus-flatpickr.js",
      format: "cjs",
      sourcemap: true
    },
    {
      file: "dist/stimulus-flatpickr.m.js",
      format: "es",
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
    resolve({ module: true, browser: true }),
    buble({
      transforms: {
        classes: false
      },
      objectAssign: "Object.assign"
    }),
    filesize()
  ]
};
