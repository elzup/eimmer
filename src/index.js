// @flow
import * as React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from './containers/App'
import registerServiceWorker from './config/registerServiceWorker'
import configureStore from './store'
import config from './config'
// import { thunkWorld } from './containers/ScreensContainer/logic'

import './config/init'

console.log(config)

const store = configureStore()
// store.dispatch(thunkWorld())
const rootEl = document.getElementById('root')

if (rootEl !== null) {
	ReactDOM.render(
		<MuiThemeProvider muiTheme={getMuiTheme()}>
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>,
		rootEl,
	)
	registerServiceWorker()
}
