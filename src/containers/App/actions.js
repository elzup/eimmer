// @flow
import { LOG_POINT } from './actionTypes'
import type { LogPoint } from './actionTypes'

export function logPoint(): LogPoint {
	return {
		type: LOG_POINT,
	}
}
