// @flow

import { create } from 'mobx-persist'
import { AsyncStorage } from 'react-native'

import App     from './App'
import Counter from './Counter'
import P0rtal from './P0rtal'

const hydrate = create({ storage: AsyncStorage })

// you can hydrate stores here with mobx-persist
// hydrate('Account', stores.Account)
hydrate('authorized', P0rtal)

module.exports = {
    App,
    Counter,
    P0rtal
}
