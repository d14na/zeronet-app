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
import stores from '../stores'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import {
    Styles
} from '../constants'

@observer
export default class Blank extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <View>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>

            <Button title="Intro" onPress={ this._gotoIntro.bind(this) } />
        </View>
    }

    componentDidMount() {

    }

    _gotoIntro() {
        console.log('goto intro')

        Navigation.push(this.props.componentId, {
            component: {
                name: 'zeronet.SecondTabScreen'
            }
        })
    }
}

const styles = StyleSheet.create({
    container: {}
})
