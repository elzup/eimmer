// @flow

import React, { Component } from 'react'
import { Stage } from 'react-konva'
import Target, { type HitResult } from '../Target'

type Props = {}
type State = {}

class App extends Component<Props, State> {
	state = {}
	render() {
		const targets = {}
		return (
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Target
					r={25}
					x={window.innerWidth / 2}
					y={window.innerHeight / 2}
					handleHit={(e: HitResult) => {
						console.log(e)
					}}
				/>
				<Target
					r={25}
					x={window.innerWidth / 5}
					y={window.innerHeight / 5}
					handleHit={(e: HitResult) => {
						console.log(e)
					}}
				/>
				<Target
					r={25}
					x={window.innerWidth * 4 / 5}
					y={window.innerHeight * 4 / 5}
					handleHit={(e: HitResult) => {
						console.log(e)
					}}
				/>
			</Stage>
		)
	}
}

export default App
