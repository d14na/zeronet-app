import React from 'react'

import {
	Platform,
	Text
} from 'react-native'

export default class MonoText extends React.Component {
    render() {
    	if (Platform.OS === 'ios')
	        return <Text
	            { ...this.props }
	            style = { [this.props.style, { fontFamily: 'Space Mono' }] } />
	    else
	        return <Text
	            { ...this.props }
	            style = { [this.props.style, { fontFamily: 'SpaceMono' }] } />
    }
}
