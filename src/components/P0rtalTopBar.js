import React from 'react'

import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../stores'

import {
    Icon
} from 'react-native-elements'

@observer
export default class P0rtalTopBar extends React.Component {
    constructor(props) {
        super(props)

        this._closeP0rtal = this._closeP0rtal.bind(this)
        this._loadHelp = this._loadHelp.bind(this)
    }

    render() {
        console.log('stores', stores)

        return <View style={ styles.container }>
            <View style={ styles.heading }>
                <Text style={ styles.headingText }>{ stores.P0rtal.title }</Text>
            </View>

            <View style={ styles.navButtons }>
                <Icon
                    reverse
                    name='question-circle-o'
                    type='font-awesome'
                    color='#6f07ef'
                    size={ 16 }
                    onPress={ this._loadHelp } />

                <Icon
                    reverse
                    name='close'
                    type='font-awesome'
                    color='#6f07ef'
                    size={ 16 }
                    onPress={ this._closeP0rtal } />
            </View>
        </View>
    }

    _closeP0rtal() {
        Navigation.mergeOptions('zeronet.P0rtal', {
            sideMenu: { right: { visible: false }}
        })
    }

    _loadHelp() {
        Navigation.push('zeronet.P0rtal', {
            component: { name: 'zeronet.P0rtal.Help' }
        })
    }

}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        backgroundColor: 'rgba(245, 245, 245, 1.0)',
        justifyContent: 'space-between'
    },
    heading: {
        width: 175,
        // backgroundColor: 'rgba(30, 120, 30, 0.2)',
        justifyContent: 'center'
    },
    headingText: {
        color: 'black',
        fontSize: 26
    },
    navButtons: {
        width: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        margin: 5,
        backgroundColor: 'rgba(30, 30, 180, 0.5)'
    },
    buttonText: {
        color: 'black',
    }
})
