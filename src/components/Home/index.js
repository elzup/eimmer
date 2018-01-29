// @flow

import React, { Component } from 'react'
import { Stage, Layer, Circle, Text } from 'react-konva'

type HitResult = {
	point: number,
}

const Target = (props: {
	r: number,
	x: number,
	y: number,
	point: number,
	handleHit: HitResult => void,
}) => {
	return (
		<Layer>
			<Text
				x={props.x - 5}
				y={props.y - props.r * 2.5}
				fontSize={props.r}
				text={props.point.toString()}
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
					props.handleHit({ point })
				}}
			/>
		</Layer>
	)
}

type Props = {}
type State = {
	point: number,
}

class App extends Component<Props, State> {
	state = {
		point: 0,
	}
	render() {
		const { state } = this
		return (
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Target
					r={25}
					x={window.innerWidth / 2}
					y={window.innerHeight / 2}
					point={state.point}
					handleHit={(e: HitResult) => {
						console.log(e)
						this.setState({ point: e.point })
					}}
				/>
			</Stage>
		)
	}
}

export default App
