// @flow

import React, { Component } from 'react'
import { Group, Circle, Text } from 'react-konva'
import Animate from 'react-move/Animate'
import { easeExpOut as ease } from 'd3-ease'

import Sound from 'react-sound'

export type HitResult = {
	point: number,
}

function pointColor(point) {
	return point >= 50 ? 'red' : 'black'
}

type Props = {
	x: number,
	y: number,
	r?: number,
	handleHit: HitResult => void,
}
type State = {
	point: number,
	hit: boolean,
	counter: number,
	play: boolean,
}

class Target extends Component<Props, State> {
	static defaultProps = { r: 25 }

	state = {
		play: false,
		hit: false,
		point: 0,
		counter: 0,
	}
	handleClick = (e: { evt: { x: number, y: number } }) => {
		const { props } = this
		const dx = props.x - e.evt.x
		const dy = props.y - e.evt.y
		const d = Math.sqrt(dx * dx + dy * dy)
		const rate = d / props.r
		const point = (10 - Math.floor(rate * 10)) * 10
		if (point <= 0) {
			return
		}
		this.setState({
			point,
			play: true,
			hit: true,
			counter: this.state.counter + 1,
		})
		props.handleHit({ point })
	}
	render() {
		const { state, props } = this
		const { x, y, r } = props
		return (
			<Group>
				<Animate
					start={() => ({
						dy: -r * 1.5,
					})}
					update={() => {
						if (state.hit) {
							this.setState({ hit: false })
							return {
								dy: [0, -r * 1.5],
								timing: { duration: 500, ease },
							}
						}
						return {}
					}}
				>
					{s => {
						return (
							<Text
								x={x - r}
								y={y - r + s.dy}
								width={r * 2}
								align={'center'}
								fontSize={r}
								fill={pointColor(state.point)}
								text={state.point.toString()}
							/>
						)
					}}
				</Animate>
				<Circle
					x={x}
					y={y}
					radius={r}
					fill={'#DE561C'}
					onClick={this.handleClick}
				/>
				<Circle
					x={x}
					y={y}
					radius={r / 2}
					fill={'#FDA831'}
					onClick={this.handleClick}
				/>
				<Sound
					url="bomb.wav"
					autoLoad={true}
					playStatus={state.play ? Sound.status.PLAYING : Sound.status.STOPPED}
					onPlaying={() => {}}
					onFinishedPlaying={() => {
						this.setState({ play: false })
					}}
				/>
			</Group>
		)
	}
}

export default Target
