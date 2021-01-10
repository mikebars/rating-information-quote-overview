/***************************************************************************/
/* `rating-information-quote-overview`                                     */
/* `Workspace`                                                             */
/* `jest-runner-eslint.config.js`                                          */
/***************************************************************************/

/** @typedef {import('jest-runner-eslint.config').JestRunnerESLintConfiguration} JestRunnerESLintConfiguration */

/** @type {JestRunnerESLintConfiguration} */
const jestRunnerESLintConfig = {
  cache: true,
  cacheLocation: '.eslintcache',
  config: '.eslintrc.json',
  ignorePath: '.eslintignore',
  maxWarnings: 0,
}

module.exports = jestRunnerESLintConfig
