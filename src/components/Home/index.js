// @flow

import React, { Component } from 'react'
import { Stage, Rect, Layer, Circle } from 'react-konva'
import _ from 'lodash'

import type { TargetItem, Config } from '../../types'
import Target, { type HitResult } from '../Target'

export type Props = {
	config: Config,
}

type Out = {
	x: number,
	y: number,
}

type State = {
	w: number,
	h: number,
	outs: { [id: string]: Out },
}

class App extends Component<Props, State> {
	state = {
		w: window.innerWidth,
		h: window.innerHeight,
		outs: {},
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
		const targets: TargetItem[] = [
			{ x: 0.5, y: 0.5, r: 25 },
			{ x: 0.2, y: 0.2, r: 25 },
			{ x: 0.8, y: 0.8, r: 25 },
			{ x: 0.2, y: 0.8, r: 25 },
			{ x: 0.8, y: 0.2, r: 25 },
		]
		return (
			<Stage
				width={window.innerWidth}
				height={window.innerHeight}
				onClick={(e: { evt: MouseEvent }) => {
					console.log(e)
					this.setState({
						outs: {
							...this.state.outs,
							[e.evt.timeStamp]: { x: e.evt.pageX, y: e.evt.pageY },
						},
					})
					setTimeout(() => {
						console.log('end')
					}, 1000)
				}}
			>
				<Layer>
					<Rect
						x={0}
						y={0}
						width={window.innerWidth}
						height={window.innerHeight}
					/>
				</Layer>
				{_.map(this.state.outs, (out, k) => (
					<Layer key={k}>
						<Circle x={out.x} y={out.y} radius={10} fill={'black'} />
					</Layer>
				))}
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
