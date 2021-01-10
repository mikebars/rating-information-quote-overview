import * as JestTypes from '@jest/types'
import * as tstb from 'ts-toolbelt'

export type JestGlobalConfiguration = Partial<
  tstb.Object.Merge<
    JestProjectConfiguration,
    {
      projects: Array<JestProjectConfiguration>
    }
  >
>

export type JestProjectConfiguration = Partial<
  tstb.Object.Merge<
    JestTypes.Config.InitialOptions,
    JestTypes.Config.ProjectConfig
  >
>

// Temporary workaround until Pick<T, K> supports template literal types.
type PickTemplate<T, K> = T[keyof Omit<
  T,
  keyof Omit<T, K & (number | string | symbol)>
>]

export type JestProjectConfigurationIgnorePatterns = PickTemplate<
  JestProjectConfiguration,
  `${string}IgnorePatterns`
>
