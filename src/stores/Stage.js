// @flow

import { Platform } from 'react-native'
import { observable, action } from 'mobx'
import { persist } from 'mobx-persist'

class Store {
    @observable debugLog = ''
    @observable ziteTitle = ''
    @observable backgroundColor = 'rgba(30, 30, 30, 0.7)'

    /* FIXME Will only display blockchain ads on Android devices to avoid
     * any issues with Apple's TOS.
     */
    @observable displayAds = Platform.OS === 'android'

    /**
     * Add a debugging log entry.
     */
    @action addDebugLog(_tag, _entry) {
        if (!_tag) return

        if (_entry) {
            this.debugLog = this.debugLog + '\n---\n\n' + _tag + '\n' + _entry
        } else {
            this.debugLog = this.debugLog + '\n---\n\n' + _tag
        }
    }

    @action updateZiteTitle(_title) {
        this.ziteTitle = _title
    }

    @action setBackgroundColor(_color) {
        this.backgroundColor = _color
    }
}

export default new Store()
