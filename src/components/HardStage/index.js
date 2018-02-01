// @flow

import React, { Component } from 'react'
import { Layer, Circle } from 'react-konva'
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

const HARD_R = 80

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
			<div
				onMouseMove={({ pageX, pageY }) => {
					const ts = this.state.targets
					let changed = false
					_.each(ts, (t, i) => {
						if (t.enable) {
							return
						}
						const dx = pageX - t.x
						const dy = pageY - t.y
						if (Math.sqrt(dx * dx + dy * dy) >= HARD_R) {
							ts[i].enable = true
							changed = true
						}
					})
					if (changed) {
						this.setState({ targets: ts })
					}
				}}
			>
				<Stage width={w} height={h}>
					<Layer>
						{_.map(_.filter(targets, { enable: false }), (t, i) => (
							<Circle
								key={i}
								stroke={'green'}
								radius={HARD_R}
								x={t.x}
								y={t.y}
							/>
						))}
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
			</div>
		)
	}
}

export default HardStage
