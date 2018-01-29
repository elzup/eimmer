// @flow

import React, { Component } from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'

class ColoredRect extends React.Component {
	state = {
		color: 'green',
	}
	handleClick = () => {
		this.setState({
			color: 'red',
		})
	}
	render() {
		return (
			<Rect
				x={20}
				y={20}
				width={50}
				height={50}
				fill={this.state.color}
				shadowBlur={5}
				onClick={this.handleClick}
			/>
		)
	}
}

class App extends Component {
	render() {
		return (
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
					<Text text="Try click on rect" />
					<ColoredRect />
				</Layer>
			</Stage>
		)
	}
}

export default App
