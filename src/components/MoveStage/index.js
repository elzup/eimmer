// @flow

import React, { Component } from 'react'
import Animate from 'react-move/Animate'
import { easeSinInOut } from 'd3-ease'

import { Stage } from 'react-konva'
import Target, { type HitResult } from '../Target'

type Props = {}
type State = {
	w: number,
	h: number,
	dx: number,
}

class MoveStage extends Component<Props, State> {
	state = {
		w: window.innerWidth,
		h: window.innerHeight,
		dx: 0.2,
	}

	updateDimensions = () => {
		this.setState({ w: window.innerWidth, h: window.innerHeight })
	}

	componentDidMount() {
		this.updateDimensions()
		window.addEventListener('resize', this.updateDimensions)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions)
	}

	render() {
		return (
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Animate
					start={() => ({
						x: 0.2,
					})}
					update={() => ({
						x: [this.state.dx],
						timing: { duration: 200, ease: easeSinInOut },
					})}
				>
					{state => {
						return (
							<Target
								r={25}
								x={window.innerWidth * state.x}
								y={window.innerHeight * 0.2}
								handleHit={(e: HitResult) => {
									this.setState({ dx: 0.2 + Math.random() * 0.6 })
									console.log(e)
								}}
							/>
						)
					}}
				</Animate>
			</Stage>
		)
	}
}

export default MoveStage
