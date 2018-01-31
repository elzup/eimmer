// @flow
import type { Config } from '../../types'

export const UPDATE_CONFIG: 'Config/UPDATE_CONFIG' = 'Config/UPDATE_CONFIG'

export const Actions = {
	UPDATE_CONFIG,
}

export type UpdateConfig = {
	type: typeof UPDATE_CONFIG,
	config: $Shape<Config>,
}

export type Action = UpdateConfig
