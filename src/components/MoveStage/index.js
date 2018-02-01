// @flow

import React, { Component } from 'react'
import Animate from 'react-move/Animate'
import { Layer, Line } from 'react-konva'
import { easeSinInOut } from 'd3-ease'

import { Stage } from 'react-konva'
import Target, { type HitResult } from '../Target'

type Props = {}
type State = {
	w: number,
	h: number,
	dx: number,
	dx2: number,
}

class MoveStage extends Component<Props, State> {
	state = {
		w: window.innerWidth,
		h: window.innerHeight,
		dx: 0.2,
		dx2: 0.2,
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
		const { state: { h, w } } = this
		return (
			<Stage width={w} height={h}>
				<Layer>
					<Line
						stroke={'#000'}
						points={[w * 0.2, h * 0.2, w * 0.8, h * 0.2]}
						fill={'black'}
					/>
				</Layer>
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
								x={w * state.x}
								y={h * 0.2}
								handleHit={(e: HitResult) => {
									this.setState({ dx: 0.2 + Math.random() * 0.6 })
									console.log(e)
								}}
							/>
						)
					}}
				</Animate>
				<Layer>
					<Line
						stroke={'#000'}
						points={[w * 0.2, h * 0.4, w * 0.8, h * 0.4]}
						fill={'black'}
					/>
				</Layer>
				<Animate
					start={() => ({
						x: 0.2,
					})}
					update={() => ({
						x: [this.state.dx2],
						timing: { duration: 200, ease: easeSinInOut },
					})}
				>
					{state => {
						return (
							<Target
								r={25}
								x={w * state.x}
								y={h * 0.4}
								handleHit={(e: HitResult) => {
									const dx2 =
										this.state.dx2 + 0.1 > 0.8 ? 0.2 : this.state.dx2 + 0.1
									this.setState({ dx2 })
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
