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

class GridStage extends React.PureComponent<Props, State> {
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
					{_.map(this.state.outs, (out, k) => (
						<Circle key={k} x={out.x} y={out.y} radius={3} fill={'black'} />
					))}
					{_.map(_.range(8), i =>
						_.map(_.range(8), j => (
							<Target
								key={i * 100 + j}
								x={w * (i * 0.1 + 0.15)}
								y={h * (j * 0.1 + 0.15)}
								handleHit={this.handleHit}
								colIn={'#fdf'}
								colOu={'#a0f'}
							/>
						)),
					)}
				</Layer>
			</Stage>
		)
	}
}

export default GridStage
