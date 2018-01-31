// @flow
import { combineReducers } from './config'
import App from './containers/App/reducer'
import Config from './containers/Config/reducer'

export default combineReducers({
	App,
	Config,
})
