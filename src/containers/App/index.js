// @flow
import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from '../../components/Home'

const App = () => (
	<Router>
		<div>
			<Route exact path="/" component={Home} />
		</div>
	</Router>
)
export default App
