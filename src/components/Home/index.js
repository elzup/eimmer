// @flow

import React from 'react'
import { Stage, Rect, Layer, Circle } from 'react-konva'
import _ from 'lodash'

import type { Config } from '../../types'
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

class App extends React.PureComponent<Props, State> {
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

	handleHit = (e: HitResult) => {
		console.log(e)
	}

	render() {
		const { state: { h, w } } = this
		return (
			<Stage
				width={window.innerWidth}
				height={window.innerHeight}
				onClick={(e: { evt: MouseEvent }) => {
					const skey = e.evt.timeStamp.toString()
					this.setState({
						outs: {
							...this.state.outs,
							[skey]: { x: e.evt.pageX, y: e.evt.pageY },
						},
					})
					setTimeout(() => {
						this.setState({
							outs: _.omit(this.state.outs, [skey]),
						})
					}, 10000)
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
						<Circle x={out.x} y={out.y} radius={3} fill={'black'} />
					</Layer>
				))}
				<Target x={w * 0.5} y={h * 0.5} handleHit={this.handleHit} />
				<Target x={w * 0.2} y={h * 0.2} handleHit={this.handleHit} />
				<Target x={w * 0.2} y={h * 0.8} handleHit={this.handleHit} />
				<Target x={w * 0.8} y={h * 0.2} handleHit={this.handleHit} />
				<Target x={w * 0.8} y={h * 0.8} handleHit={this.handleHit} />
			</Stage>
		)
	}
}

export default App
