// @flow
import type { Action, Config } from '../../types'
import { Actions } from './actionTypes'

export type State = Config

export const initialState: State = {
	soundOn: true,
}

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.UPDATE_CONFIG:
			return {
				...state,
				...action.config,
			}

		default:
			return state
	}
}
