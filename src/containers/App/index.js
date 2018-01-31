// @flow
import React from 'react'
import { connect, type Connector } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton'

import Home from '../../components/Home'
import ConfigFooter from '../../components/ConfigFooter'
import MoveStage from '../../components/MoveStage'
import { getConfig } from '../Config/selectors'
import { updateConfig } from '../Config/actions'
import type { State, Config } from '../../types'
// import * as selectors from './selectors'

type Props = {
	config: Config,
	updateConfig: (config: Config) => void,
}

const App = (props: Props) => (
	<Router>
		<div>
			<div>
				<Route
					exact
					path="/"
					component={() => <Home config={props.config} />}
				/>
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
			<div className="bottom">
				<ConfigFooter config={props.config} updateConfig={props.updateConfig} />
				<style jsx>{`
					.bottom {
						position: absolute;
						bottom: 0;
						left: 0;
					}
				`}</style>
			</div>
		</div>
	</Router>
)
type OProps = {}

const ms = (state: State) => ({
	config: getConfig(state),
})

const conn: Connector<OProps, Props> = connect(ms, { updateConfig })

export default conn(App)
