// @flow

import React, { Component } from 'react'
import { Stage } from 'react-konva'
import Target, { type HitResult } from '../Target'
import { spring } from 'react-motion'
import { ReactMotionLoop } from 'react-motion-loop'

type Props = {}
type State = {
	w: number,
	h: number,
}

class MoveStage extends Component<Props, State> {
	state = {
		w: window.innerWidth,
		h: window.innerHeight,
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
				<ReactMotionLoop
					styleFrom={{ dx: spring(0.2, { stiffness: 5, damping: 5 }) }}
					styleTo={{ dx: spring(0.8, { stiffness: 5, damping: 5 }) }}
				>
					{pos => (
						<Target
							r={25}
							x={window.innerWidth * pos.dx}
							y={window.innerHeight * 0.2}
							handleHit={(e: HitResult) => {
								console.log(e)
							}}
						/>
					)}
				</ReactMotionLoop>
			</Stage>
		)
	}
}

export default MoveStage
