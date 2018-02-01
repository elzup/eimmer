// @flow

import React, { Component } from 'react'
import Animate from 'react-move/Animate'
import { Layer, Line } from 'react-konva'
import { easeSinInOut } from 'd3-ease'

import { Stage } from 'react-konva'
import Target, { type HitResult } from '../Target'
import LineTarget from '../LineTarget'

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
		dxi: 0,
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
		const stepPos = ({ i, max, step, offset }) => {
			const dv = (max - offset) / step
			return offset + dv * (step - Math.abs(i % (step * 2) - step))
		}
		return (
			<Stage width={w} height={h}>
				<Layer>
					<LineTarget
						sx={w * 0.2}
						sy={h * 0.2}
						ex={w * 0.8}
						ey={h * 0.2}
						ix={({ i, n }) =>
							w * stepPos({ i, max: 0.8, step: 6, offset: 0.2 })
						}
					/>
				</Layer>
			</Stage>
		)
	}
}

export default MoveStage
