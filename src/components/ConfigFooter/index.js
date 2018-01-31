// @flow
import * as React from 'react'
import type { Config } from '../../types'
import Toggle from 'material-ui/Toggle'

export type Props = {
	config: Config,
	updateConfig: (config: Config) => void,
}

const ConfigFooter = (props: Props) => (
	<div>
		<Toggle
			label="Sound"
			toggled={props.config.soundOn}
			onToggle={e => {
				props.updateConfig({ soundOn: !props.config.soundOn })
			}}
		/>
	</div>
)
export default ConfigFooter
