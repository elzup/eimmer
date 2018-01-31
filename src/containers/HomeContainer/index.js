// @flow

import { connect, type Connector } from 'react-redux'
import HomeComponent, { type Props } from '../../components/Home'
import { getConfig } from '../Config/selectors'
import type { State } from '../../types'
// import * as selectors from './selectors'

type OProps = {}

const ms = (state: State) => ({
	config: getConfig(state),
})

const conn: Connector<OProps, Props> = connect(ms, {})

export default conn(HomeComponent)
