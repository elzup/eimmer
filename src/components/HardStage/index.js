// @flow

import React, { Component } from 'react'
import { Layer } from 'react-konva'
import _ from 'lodash'

import { Stage } from 'react-konva'
import Target from '../Target'

type Props = {}
type State = {
	w: number,
	h: number,
}

const w = window.innerWidth
const h = window.innerHeight

class HardStage extends Component<Props, State> {
	state = {
		w,
		h,
		targets: {
			0: { x: w * 0.2, y: h * 0.5, enable: true },
			1: { x: w * 0.5, y: h * 0.2, enable: true },
			2: { x: w * 0.5, y: h * 0.8, enable: true },
			3: { x: w * 0.8, y: h * 0.5, enable: true },
			4: { x: w * 0.5, y: h * 0.5, enable: true },
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
			<Stage width={w} height={h} onMouseMove={e => {}}>
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
										[i]: { ...targets[i], enable: false },
									},
								})
							}}
							enable={t.enable}
							colIn={'#afa'}
							colOu={'#0a0'}
						/>
					))}
				</Layer>
			</Stage>
		)
	}
}

export default HardStage
