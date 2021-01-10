export type JestRunnerESLintConfiguration = {
  cache?: boolean
  cacheLocation?: string
  config?: string
  env?: string | Array<string>
  ext?: string | Array<string>
  fix?: boolean
  fixDryRun?: boolean
  format?: string
  global?: string | Array<string>
  ignorePath?: string
  ignorePattern?: Array<string>
  maxWarnings?: number
  noEslintrc?: boolean
  noIgnore?: boolean
  noInlineConfig?: boolean
  parser?: string
  parserOptions?: Record<string, unknown>
  plugin?: string | Array<string>
  quiet?: boolean
  reportUnusedDisableDirectives?: boolean
  resolvePluginsRelativeTo?: string
  rules?: Record<string, unknown>
  rulesdir?: string | Array<string>
}
