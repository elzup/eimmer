// @flow

import React, { Component } from 'react'
import { Layer, Circle, Text } from 'react-konva'
import Sound from 'react-sound'

export type HitResult = {
	point: number,
}

function pointColor(point) {
	if (point >= 9) {
		return 'red'
	}
	if (point >= 5) {
		return 'blue'
	}
	return 'black'
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
	render() {
		const { state, props } = this
		return (
			<Layer>
				<Text
					x={props.x - 5}
					y={props.y - props.r * 2.5}
					fontSize={props.r}
					fill={pointColor(state.point)}
					text={state.point.toString()}
				/>
				<Circle
					x={props.x}
					y={props.y}
					radius={props.r}
					fill={'green'}
					shadowBlur={5}
					onClick={({ evt }: { evt: { x: number, y: number } }) => {
						const dx = props.x - evt.x
						const dy = props.y - evt.y
						const d = Math.sqrt(dx * dx + dy * dy)
						const rate = d / props.r
						const point = 10 - Math.floor(rate * 10)
						this.setState({ point, play: true })
						props.handleHit({ point })
					}}
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
