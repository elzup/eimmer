// @flow
export const LOG_POINT: 'App/LOG_POINT' = 'App/LOG_POINT'

export const Actions = {
	LOG_POINT,
}

export type LogPoint = {
	type: typeof LOG_POINT,
}

export type Action = LogPoint
