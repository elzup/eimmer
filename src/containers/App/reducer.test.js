// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'

test('provide the initial state', () => {
	expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
})

test('handle LOG_POINT', () => {
	expect(reducer(initialState, actions.logPoint())).toEqual({})
})
