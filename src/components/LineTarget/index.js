// @flow

import React, { Component } from 'react'
import { Group, Line } from 'react-konva'
import Animate from 'react-move/Animate'
import { easeSinInOut as ease } from 'd3-ease'

import Target, { type HitResult } from '../Target'

export type UpdatePos = { i: number, s: number, e: number }

type Props = {
	sx: number,
	sy: number,
	ex: number,
	ey: number,
	ix?: UpdatePos => number,
	iy?: UpdatePos => number,
	handleHit?: HitResult => void,
}
type State = {
	pi: number,
	x: number,
	y: number,
}

class LineTarget extends Component<Props, State> {
	static defaultProps = {
		ix: (p: UpdatePos) => p.s,
		iy: (p: UpdatePos) => p.s,
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
								colOu={'#00a'}
								colIn={'#46ebff'}
								handleHit={(e: HitResult) => {
									const pi = state.pi + 1
									this.setState({
										pi,
										x: props.ix({ i: state.pi, s: sx, e: ex }),
										y: props.iy({ i: state.pi, s: sy, e: ey }),
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
