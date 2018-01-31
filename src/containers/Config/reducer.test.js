// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'

test('provide the initial state', () => {
	expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
})

test('handle UPDATE_CONFIG', () => {
	expect(reducer(initialState, actions.updateConfig())).toEqual({})
})
