// @flow
import * as React from 'react'
import type { Config } from '../../types'

export type Props = {
	config: Config,
	updateConfig: (config: Config) => void,
}

const ConfigFooter = (props: Props) => <div>{JSON.stringify(props)}</div>
export default ConfigFooter
