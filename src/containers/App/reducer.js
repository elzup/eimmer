// @flow
import type { Action } from '../../types'
import { Actions } from './actionTypes'

export type State = {}

export const initialState: State = {}

export default function(state: State = initialState, action: Action): State {
	switch (action.type) {
		case Actions.LOG_POINT:
			return {
				...state,
			}
		default:
			return state
	}
}
