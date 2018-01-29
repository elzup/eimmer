// @flow
import type { Action as AppAction } from '../containers/App/actionTypes'

export type ReduxInitAction = {
	type: '@@INIT',
}

export type Action = ReduxInitAction | AppAction
