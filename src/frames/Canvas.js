import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import {Navigation} from 'react-native-navigation';

import {Button} from 'react-native-elements';

// import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
// import stores from '../stores';

import {Shared} from '../constants';

@observer
class Canvas extends React.Component {
    constructor(props) {
        super(props);

        /* Track event. */
        Shared.TrackEvent('CANVAS_');
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this._close.bind(this)}
                    icon={{name: 'window-close', type: 'font-awesome'}}
                    title="Close"
                />

                <View style={styles.centerView}>
                    <Text>GRAPHICS ART CANVAS (LOTTIE-STYLE)</Text>
                </View>
            </View>
        );
    }

    componentDidMount() {}

    _close() {
        Navigation.pop(this.props.componentId);
        // Navigation.dismissModal(this.props.componentId);
    }

    _hide() {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                visible: true,
                animate: true,
                drawBehind: false,
            },
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row'
    },
    centerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Canvas;
