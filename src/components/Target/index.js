// @flow

import React, { Component } from 'react'
import { Layer, Circle, Text } from 'react-konva'
import { Motion, spring } from 'react-motion'

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
	soundOn: boolean,
	handleHit: HitResult => void,
}
type State = {
	point: number,
	counter: number,
	play: boolean,
}

class Target extends Component<Props, State> {
	state = {
		play: false,
		point: 0,
		counter: 0,
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
		this.setState({
			point,
			play: props.soundOn,
			counter: this.state.counter + 1,
		})
		props.handleHit({ point })
	}
	render() {
		const { state, props } = this
		const { x, y, r } = props
		return (
			<Layer>
				<Motion
					key={state.counter}
					defaultStyle={{ dy: 0 }}
					style={{ dy: spring(-10) }}
				>
					{ips => (
						<Text
							x={x - r}
							y={y - r * 2.5 + ips.dy}
							width={r * 2}
							align={'center'}
							fontSize={r}
							fill={pointColor(state.point)}
							text={state.point.toString()}
						/>
					)}
				</Motion>
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
					onFinishedPlaying={() => {
						this.setState({ play: false })
					}}
				/>
			</Layer>
		)
	}
}

export default Target
