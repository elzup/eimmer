// @flow

import React, { Component } from 'react'
import { Layer } from 'react-konva'

import { Stage } from 'react-konva'
import LineTarget, { type UpdatePos } from '../LineTarget'

type Props = {}
type State = {
	w: number,
	h: number,
}

function stepPos(p) {
	const { i, s, e, step } = p
	const dv = (e - s) / step
	return s + dv * (step - Math.abs(i % (step * 2) - step))
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
		const { state: { h, w } } = this
		return (
			<Stage width={w} height={h}>
				<Layer>
					<LineTarget
						sx={w * 0.2}
						sy={h * 0.15}
						ex={w * 0.8}
						ey={h * 0.15}
						ix={(p: UpdatePos) => stepPos({ ...p, step: 6 })}
					/>
					<LineTarget
						sx={w * 0.15}
						sy={h * 0.2}
						ex={w * 0.15}
						ey={h * 0.8}
						iy={(p: UpdatePos) => stepPos({ ...p, step: 6 })}
					/>
					<LineTarget
						sx={w * 0.25}
						sy={h * 0.85}
						ex={w * 0.85}
						ey={h * 0.25}
						ix={(p: UpdatePos) => stepPos({ ...p, step: 6 })}
						iy={(p: UpdatePos) => stepPos({ ...p, step: 6 })}
					/>
					<LineTarget
						sx={w * 0.25}
						sy={h * 0.25}
						ex={w * 0.85}
						ey={h * 0.85}
						ix={(p: UpdatePos) => stepPos({ ...p, step: 6 })}
						iy={(p: UpdatePos) => stepPos({ ...p, step: 6 })}
					/>
				</Layer>
			</Stage>
		)
	}
}

export default MoveStage
