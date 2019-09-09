module.exports = {
  env: {
    test: {
      plugins: [
        [
          'istanbul',
          {
            exclude: ['spec/**/*.js']
          }
        ]
      ]
    }
  },
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '58',
          ie: '11'
        }
      }
    ]
  ],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-classes']
}
