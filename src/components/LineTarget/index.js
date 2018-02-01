// @flow

import React, { Component } from 'react'
import { Group, Line } from 'react-konva'
import Animate from 'react-move/Animate'
import { easeSinInOut as ease } from 'd3-ease'

import Target, { type HitResult } from '../Target'

type Props = {
	sx: number,
	sy: number,
	ex: number,
	ey: number,
	ix?: ({ i: number, n: number }) => number,
	iy?: ({ i: number, n: number }) => number,
	handleHit?: HitResult => void,
}
type State = {
	pi: number,
	x: number,
	y: number,
}

class LineTarget extends Component<Props, State> {
	static defaultProps = {
		ix: p => p.n,
		iy: p => p.n,
		handleHit: e => {},
	}

	state = {
		pi: 1,
		x: this.props.sx,
		y: this.props.sy,
	}

	render() {
		const { state, props } = this
		const { sx, sy, ex, ey } = props
		return (
			<Group>
				<Line stroke={'#000'} points={[sx, sy, ex, ey]} fill={'black'} />
				<Animate
					start={() => ({
						x: sx,
						y: sy,
					})}
					update={() => {
						console.log(state)
						return {
							x: [state.x],
							y: [state.y],
							timing: { duration: 200, ease },
						}
					}}
				>
					{astate => {
						return (
							<Target
								r={25}
								x={astate.x}
								y={astate.y}
								handleHit={(e: HitResult) => {
									const pi = state.pi + 1
									this.setState({
										pi,
										x: props.ix({ i: state.pi, n: sx }),
										y: props.iy({ i: state.pi, n: sy }),
									})
									props.handleHit(e)
								}}
							/>
						)
					}}
				</Animate>
			</Group>
		)
	}
}

export default LineTarget
