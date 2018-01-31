// @flow
import type { Config } from '../../types'

import { UPDATE_CONFIG } from './actionTypes'
import type { UpdateConfig } from './actionTypes'

export function updateConfig(config: $Shape<Config>): UpdateConfig {
	return {
		type: UPDATE_CONFIG,
		config,
	}
}
