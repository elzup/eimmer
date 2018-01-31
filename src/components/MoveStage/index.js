// @flow

import React, { Component } from 'react'
import { Stage } from 'react-konva'
import type { TargetItem } from '../../types'
import Target, { type HitResult } from '../Target'
import { Motion, spring } from 'react-motion'

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

	/**
	 * Remove event listener
	 */
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions)
	}

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
				<Motion
					defaultStyle={{ dx: 0.2 }}
					onRest={() => {}}
					style={{ dx: spring(0.8, { stiffness: 30, damping: 20 }) }}
				>
					{ips => (
						<Target
							r={25}
							x={window.innerWidth * ips.dx}
							y={window.innerHeight * 0.2}
							handleHit={(e: HitResult) => {
								console.log(e)
							}}
						/>
					)}
				</Motion>
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

export default MoveStage
