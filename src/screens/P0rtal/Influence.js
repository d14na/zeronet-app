import React from 'react'

import {
    Button,
    StyleSheet,
    ScrollView,
    Text,
    View
} from 'react-native'

import { Navigation } from 'react-native-navigation'

import { observable } from 'mobx'
import { observer } from 'mobx-react/native'
import stores from '../../stores'

import Icon from 'react-native-vector-icons/FontAwesome'

import {
    Styles
} from '../../constants'

@observer
export default class Influence extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <View style={ styles.container }>
            <View style={ [Styles.centerView, { paddingBottom: 100 }] }>
                <Icon name={'book'} style={ styles.icon } />

                <Text style={ styles.heading }>
                    Influence
                    {'\n'}coming soon...
                </Text>
            </View>
        </View>
    }

    componentDidMount() {
        stores.P0rtal.setP0rtalTitle('Influence')

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
