import React from 'react';

import {
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';

import {Navigation} from 'react-native-navigation';

import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import stores from '../../stores';

import {
    Avatar,
    Button,
    FormLabel,
    FormInput,
    FormValidationMessage,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Shared, Styles} from '../../constants';

@observer
class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        /* Track event. */
        Shared.TrackEvent('DASHBOARD_');

        this._loadProfile = this._loadProfile.bind(this);
        this._loadC0urier = this._loadC0urier.bind(this);
        this._loadInfluence = this._loadInfluence.bind(this);
        this._loadStreams = this._loadStreams.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    <View
                        style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                        <Avatar
                            rounded
                            showEditButton
                            source={{
                                uri: 'https://i.imgur.com/Ol9B62J.png',
                            }}
                            onEditPress={this._loadProfile}
                            size="xlarge"
                            activeOpacity={0.7}
                        />
                    </View>

                    <View
                        style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                        <Button
                            large
                            style={{flex: 1, width: 150}}
                            onPress={this._loadC0urier}
                            icon={{name: 'at', type: 'font-awesome'}}
                            title="C0urier"
                        />

                        <Button
                            large
                            style={{flex: 1, width: 150}}
                            onPress={this._loadInfluence}
                            icon={{name: 'book', type: 'font-awesome'}}
                            title="Influence"
                        />
                    </View>

                    <View
                        style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
                        <Button
                            large
                            style={{flex: 1, width: 150}}
                            onPress={this._loadStreams}
                            icon={{name: 'rss-square', type: 'font-awesome'}}
                            title="Streams"
                        />
                    </View>
                </View>

                <TouchableHighlight
                    onPress={this._signOut}
                    style={styles.signOut}>
                    <Text style={styles.signOutText}>SIGNOUT</Text>
                </TouchableHighlight>
            </View>
        );
    }

    componentDidMount() {}

    _signOut() {
        stores.P0rtal.exit();
    }

    _loadProfile() {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.P0rtal.Profile',
                name: 'zeronet.P0rtal.Profile',
            },
        });
    }

    _loadC0urier() {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.P0rtal.C0urier',
                name: 'zeronet.P0rtal.C0urier',
            },
        });
    }

    _loadInfluence() {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.P0rtal.Influence',
                name: 'zeronet.P0rtal.Influence',
            },
        });
    }

    _loadStreams() {
        Navigation.push(this.props.componentId, {
            component: {
                id: 'zeronet.P0rtal.Streams',
                name: 'zeronet.P0rtal.Streams',
            },
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
    },
    heading: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        textAlign: 'center',
    },

    buttonContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'tomato',
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOut: {
        width: '100%',
        height: 50,
        padding: 15,
        // margin: 10,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(90, 220, 220, 0.9)',
    },
    signOutText: {
        fontSize: 20,
    },
});

export default Dashboard;
