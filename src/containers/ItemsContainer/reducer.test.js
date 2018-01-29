// @flow
import reducer, { initialState } from './reducer'
import * as actions from './actions'

test('provide the initial state', () => {
	expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState)
})

test('handle RECEIVE_ITEM', () => {
	expect(
		reducer(initialState, actions.receiveItem({ id: 1, name: 'Hoge' })),
	).toEqual([1])
})

test('handle DELETE_ITEM', () => {
	expect(reducer([1, 2, 3], actions.deleteItem(2))).toEqual([1, 3])
})
