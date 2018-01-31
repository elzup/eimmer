// @flow
import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

import Home from '../../components/Home'
import MoveStage from '../../components/MoveStage'

const App = () => (
	<Router>
		<div>
			<div>
				<Route exact path="/" component={Home} />
				<Route path="/move" component={MoveStage} />
			</div>
			<div className="float">
				<FlatButton label="home" containerElement={<Link to="/" />} />
				<FlatButton label="move" containerElement={<Link to="/move" />} />
				<style jsx>{`
					.float {
						position: absolute;
						top: 0;
						left: 0;
					}
				`}</style>
			</div>
		</div>
	</Router>
)
export default App
