import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

const pkg = require('./package.json')

export default {
  input: 'src/index.js',
  external: ['@hotwired/stimulus', 'flatpickr'],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.m.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: pkg.amdName,
      sourcemap: true,
      globals: {
        '@hotwired/stimulus': 'Stimulus',
        flatpickr: 'Flatpickr'
      }
    }
  ],
  plugins: [resolve(), babel(), filesize()]
}
