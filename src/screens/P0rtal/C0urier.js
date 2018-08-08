import React from 'react'

import {
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../../stores'

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
    Styles
} from '../../constants'

@observer
export default class Courier extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <View style={ styles.container }>
            <View style={ [Styles.centerView, { paddingBottom: 100 }] }>
                <Icon name={'at'} style={ styles.icon } />

                <Text style={ styles.heading }>
                    Courier Messaging
                    {'\n'}coming soon...
                </Text>
            </View>
        </View>
    }

    componentDidMount() {
        stores.P0rtal.setP0rtalTitle('C0urier')

        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    component: {
                        id: 'zeronet.P0rtalTopBar',
                        name: 'zeronet.P0rtalTopBar'
                    }
                },
                visible: true,
                drawBehind: false
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(30, 30, 30, 0.9)'
    },
    heading: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 32,
        textAlign: 'center'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 64,
        textAlign: 'center',
        margin: 25
    }
})
