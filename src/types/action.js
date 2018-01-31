// @flow
import type { Action as AppAction } from '../containers/App/actionTypes'
import type { Action as ConfigAction } from '../containers/Config/actionTypes'

export type ReduxInitAction = {
	type: '@@INIT',
}

export type Action = ReduxInitAction | AppAction | ConfigAction
