/**
 * @typedef {{
 *  defaultSeverity?: string
 *  extends?: string | Array<string>
 *  ignoreFiles?: string | Array<string>
 *  plugins?: Array<string>
 *  processors?: Array<string>
 *  rules: Record<string, boolean | string | [boolean, Record<string, unknown>] | null>
 * }} StylelintConfig
 */

/**
 * @type {StylelintConfig}
 */
const stylelintConfig = {
  extends: [
    'stylelint-config-standard',
    process.env.STYLELINT_NO_CSS_IN_JS === 'true'
      ? undefined
      : 'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ].filter(Boolean),
  plugins: ['stylelint-prettier'],
  processors:
    process.env.STYLELINT_NO_CSS_IN_JS === 'true'
      ? undefined
      : ['stylelint-processor-styled-components'],
  rules: {
    'prettier/prettier': true,
  },
}

module.exports = stylelintConfig
