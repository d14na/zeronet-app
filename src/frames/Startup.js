import '../../shim'

import React from 'react'

import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native'

import {
    ButtonGroup
} from 'react-native-elements'

import { Navigation } from 'react-native-navigation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import { Client } from 'bugsnag-react-native'

import Amplitude from 'amplitude'

import DeviceInfo from 'react-native-device-info'

import {
    Button,
    SearchBar
} from 'react-native-elements'

@observer
export default class StartupFrame extends React.Component {
    @observable searchVal = ''
    @observable selectedIndex = 1

    constructor(props) {
        super(props)

        console.log('Main Frame received props', props)

        this._addLog = this._addLog.bind(this)
        this._handleSearchInput = this._handleSearchInput.bind(this)
        this._handleSearchSubmit = this._handleSearchSubmit.bind(this)
        this._updateIndex = this._updateIndex.bind(this)
        this._loadZite = this._loadZite.bind(this)

        // const bugsnag = new Client()
        // bugsnag.notify(new Error("TEST: First error"))

        /* Initialize amplitude. */
        const amplitude = new Amplitude('beadb78ade3fd20e320417ed123488b4')

        /* Set the event type. */
        const event_type = 'MAIN_'

        /* Retrieve device id. */
        const device_id = DeviceInfo.getUniqueID()
        console.info('Device Unique Id', device_id)

        /* Set the tracking data. */
        const trackingData = { event_type, device_id }

        /* Call amplitude api. */
        amplitude.track(trackingData)
            .catch(e => console.log(e))
    }

    render() {
        const buttons = ['Recent', 'Favorites', 'Trending']

        return <ScrollView>
            <View style={ styles.container }>
                <SearchBar
                    ref={ search => this.search = search }
                    icon={{ type: 'font-awesome', name: 'hashtag' }}
                    clearIcon={{ color: 'rgba(220, 90, 90, 0.35)', type: 'font-awesome', name: 'times-circle', style: { marginRight: 5 } }}
                    inputStyle={{ paddingLeft: 40, paddingBottom: 9 }}
                    placeholder='Looking for something interesting?'
                    onChangeText={ this._handleSearchInput }
                    onSubmitEditing={ this._handleSearchSubmit } />

                <View style={ styles.contentContainer }>
                    <Image
                        source={ require('../../res/img/startup-banner.png') }
                        resizeMode='stretch'
                        style={ styles.mainBanner } />

                    <ButtonGroup
                          onPress={ this._updateIndex }
                          selectedIndex={ this.selectedIndex }
                          buttons={ buttons }
                          containerStyle={{ height: 30 }} />

                    <Button
                        large
                        containerViewStyle={ styles.mainButtons }
                        borderRadius={ 3 }
                        onPress={ () => this._loadZite('guide') }
                        icon={{ name: 'university', type: 'font-awesome' }}
                        title='ZER0̸NET 10̸1' />

                    <Button
                        large
                        containerViewStyle={ styles.mainButtons }
                        borderRadius={ 3 }
                        onPress={ () => this._loadZite('zitetags') }
                        icon={{ name: 'hashtag', type: 'font-awesome' }}
                        title='ZITETAGS' />

                    <Button
                        large
                        containerViewStyle={ styles.mainButtons }
                        borderRadius={ 3 }
                        onPress={ () => this._loadZite('blog') }
                        icon={{ name: 'book', type: 'font-awesome' }}
                        title='ZER0̸BLOG' />

                </View>
            </View>
        </ScrollView>
    }

    componentDidAppear() {
        console.log('RNN', 'CTB.componentDidAppear')
    }

    componentDidDisappear() {
        console.log('RNN', `CTB.componentDidDisappear`)
    }

    componentDidMount() {
        this.client = null
        this.requests = []

        /* Initialize the payload. */
        // payload = null

        // this._cryptTest()
        // this._bmTest()
        // this._peerTest()
    }

    componentWillUnmount() {
        console.log('RNN', `CTB.componentWillUnmount`)
    }

    _addLog(_tag, _entry) {
        this.debug = this.debug + '\n---\n\n' + _tag + '\n' + _entry
        console.log(_tag, _entry)
    }

    _handleSearchInput(_val) {
        console.log('handle search', _val)
        this.searchVal = _val
    }

    _handleSearchSubmit() {
        // console.log('handle search', _val)
        const searchVal = this.searchVal
        alert(`Now loading ${searchVal}...`)
    }

    _updateIndex(_selectedIndex) {
        this.selectedIndex = _selectedIndex
    }

    _loadZite(_target) {
        this._addLog('load webview with target', _target)
        alert(`loading ${_target}`)

        // this._findPeers()

        return

        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.Webview',
                name: 'zeronet.Webview',
                options: {
                    topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true
                    }
                },
                passProps: { ziteTag: _target }
            }
        })
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    contentContainer: {
        padding: 20
    },

    mainBanner: {
        width: '100%',
        height: 160,
        // borderStyle: 'solid',
        // borderWidth: 2,
        // borderColor: 'red',

        marginTop: 25,
        marginBottom: 25
    },
    mainButtons: {
        marginTop: 10,
        borderRadius: 3
    }
})
