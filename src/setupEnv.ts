import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import * as fs from 'fs'
import path from 'path'

const NODE_ENV: NodeJS.ProcessEnv['NODE_ENV'] | undefined = process.env
  .NODE_ENV as NodeJS.ProcessEnv['NODE_ENV'] | undefined

if (NODE_ENV === undefined) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  )
}

const CWD: string = process.cwd()

const dotenvFiles: Array<string> = [
  `.env.${NODE_ENV}.local`,
  `.env.${NODE_ENV}`,
  NODE_ENV === 'test' ? undefined : `.env.local`,
  `.env`,
]
  .filter<string>(
    (dotenvFile: string | undefined): dotenvFile is string =>
      dotenvFile !== undefined,
  )
  .map((dotenvFile: string): string => path.resolve(CWD, dotenvFile))

dotenvFiles.forEach((dotenvFile: string): void => {
  /* tslint:disable-next-line:non-literal-fs-path */
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand(dotenv.config({ path: dotenvFile }))
  }
})
