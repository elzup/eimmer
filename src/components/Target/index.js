// @flow

import React, { Component } from 'react'
import { Layer, Circle, Text } from 'react-konva'
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
	r: number,
	handleHit: HitResult => void,
}
type State = {
	point: number,
	play: boolean,
}

class Target extends Component<Props, State> {
	state = {
		play: false,
		point: 0,
	}
	handleClick = ({ evt }: { evt: { x: number, y: number } }) => {
		const { props } = this
		const dx = props.x - evt.x
		const dy = props.y - evt.y
		const d = Math.sqrt(dx * dx + dy * dy)
		const rate = d / props.r
		const point = (10 - Math.floor(rate * 10)) * 10
		if (point <= 0) {
			return
		}
		this.setState({ point, play: true })
		props.handleHit({ point })
	}
	render() {
		const { state, props } = this
		const { x, y, r } = props
		return (
			<Layer>
				<Text
					x={x - r}
					width={r * 2}
					align={'center'}
					y={y - r * 2.5}
					fontSize={r}
					fill={pointColor(state.point)}
					text={state.point.toString()}
				/>
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
					onPlaying={() => {
						console.log('play start')
					}}
					onFinishedPlaying={() => {
						this.setState({ play: false })
					}}
				/>
			</Layer>
		)
	}
}

export default Target
