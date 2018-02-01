// @flow

import React, { Component } from 'react'
import { Layer } from 'react-konva'
import _ from 'lodash'

import { Stage } from 'react-konva'
import Target from '../Target'

type TargetObj = {
	x: number,
	y: number,
	enable: boolean,
}

type Props = {}
type State = {
	w: number,
	h: number,
	targets: { [i: number]: TargetObj },
}

const w = window.innerWidth
const h = window.innerHeight

class RandStage extends Component<Props, State> {
	state = {
		w,
		h,
		targets: {
			0: { x: w * 0.2, y: h * 0.5, enable: true },
			1: { x: w * 0.5, y: h * 0.2, enable: true },
			2: { x: w * 0.5, y: h * 0.8, enable: true },
		},
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
		const { state: { h, w, targets } } = this
		return (
			<Stage width={w} height={h}>
				<Layer>
					{_.map(targets, (t, i) => (
						<Target
							key={i}
							x={t.x}
							y={t.y}
							handleHit={e => {
								this.setState({
									targets: {
										...targets,
										[i]: {
											...targets[i],
											x: w * _.random(0.2, 0.8),
											y: h * _.random(0.2, 0.8),
										},
									},
								})
							}}
							enable={t.enable}
							colIn={'#fdf'}
							colOu={'#a0f'}
						/>
					))}
				</Layer>
			</Stage>
		)
	}
}

export default RandStage
