// @flow

import _combineReducers from './combineReducers'
const { NODE_ENV } = process.env

if (!NODE_ENV) {
	console.error(process.env)
	throw Error('Configuration not completed. must setup envioraments.')
}

type Config = {
	+isDev: boolean,
	+admin: {
		+name: string,
		+countMax: number,
	},
}
const isDev = NODE_ENV === 'development'

const configDevelopment = {
	admin: {
		name: 'admin',
		countMax: 100,
	},
}
const configProduction = {
	admin: {
		name: 'proadmin',
		countMax: 100,
	},
}

const config: Config = {
	isDev,
	admin: { name: '', countMax: 0 },
	...(isDev ? configDevelopment : configProduction),
}

export const combineReducers = _combineReducers

export default config
