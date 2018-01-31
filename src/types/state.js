// @flow
import type { State as App } from '../containers/App/reducer'
import type { State as Config } from '../containers/Config/reducer'

export type State = {
	App: App,
	Config: Config,
}
