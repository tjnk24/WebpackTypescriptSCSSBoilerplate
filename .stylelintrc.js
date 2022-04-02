module.exports = {
  extends: "stylelint-config-standard",
  customSyntax: 'postcss-scss',
  rules: {
    "indentation": 4,
    "max-nesting-depth": 5,
    "selector-max-id": 3,
    "selector-class-pattern": "[A-z]+",
    "declaration-property-value-disallowed-list": null,
    "color-named": null,
    "property-no-unknown": null,
    "color-no-invalid-hex": null,
    "color-hex-case": null,
    "no-invalid-position-at-import-rule": null,
    "string-quotes": null,
    "max-line-length": 150,
    "property-no-vendor-prefix": null
  },
  ignoreFiles: [
    'build/**'
  ]
}
