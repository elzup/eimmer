// @flow

import React, { Component } from 'react'
import { Stage } from 'react-konva'
import { TargetItem } from '../../types'
import Target, { type HitResult } from '../Target'

type Props = {}
type State = {}

class App extends Component<Props, State> {
	state = {}
	render() {
		const targets: TargetItem[] = [
			{ x: 0.5, y: 0.5, r: 25 },
			{ x: 0.2, y: 0.2, r: 25 },
			{ x: 0.8, y: 0.8, r: 25 },
			{ x: 0.2, y: 0.8, r: 25 },
			{ x: 0.8, y: 0.2, r: 25 },
		]
		return (
			<Stage width={window.innerWidth} height={window.innerHeight}>
				{targets.map((target, i) => (
					<Target
						key={i}
						r={target.r}
						x={window.innerWidth * target.x}
						y={window.innerHeight * target.y}
						handleHit={(e: HitResult) => {
							console.log(e)
						}}
					/>
				))}
			</Stage>
		)
	}
}

export default App
