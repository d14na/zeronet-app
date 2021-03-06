/* global WebSocket */

/* FIXME: Verify that we actually need `self`. */
/* eslint consistent-this: ["error", "self"] */

import React from 'react';

import {
    Image,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {Button, ButtonGroup, Icon, SearchBar} from 'react-native-elements';

import {Navigation} from 'react-native-navigation';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import stores from '../stores';

import {Shared, Styles} from '../constants';

import bitcoinMessage from 'bitcoinjs-message';
// import Peer0 from '../lib/peer0';
// import net from 'react-native-tcp';

@observer
class StartupFrame extends React.Component {
    @observable searchVal = '';
    @observable selectedIndex = 1;

    constructor(props) {
        super(props);

        /* Track event. */
        Shared.TrackEvent('STARTUP_');

        this._handleSearchInput = this._handleSearchInput.bind(this);
        this._handleSearchSubmit = this._handleSearchSubmit.bind(this);
        this._openScanner = this._openScanner.bind(this);
        this._updateIndex = this._updateIndex.bind(this);

        this._initZite = this._initZite.bind(this);
        // this._pex = this._pex.bind(this);

        this.state = {
            test3Txt: 'test STATE output',
        };
    }

    render() {
        const buttons = ['Recent', 'Favorites', 'Trending'];

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Icon
                            name="qrcode"
                            type="font-awesome"
                            color="rgba(134, 147, 158, 1.0)"
                            underlayColor="rgba(57, 62, 66, 1.0)"
                            size={28}
                            containerStyle={styles.btnQrCode}
                            onPress={this._openScanner}
                        />

                        <SearchBar
                            ref={search => (this.search = search)}
                            icon={{type: 'font-awesome', name: 'hashtag'}}
                            clearIcon={{
                                color: 'rgba(220, 90, 90, 0.35)',
                                type: 'font-awesome',
                                name: 'times-circle',
                                style: {marginRight: 5},
                            }}
                            containerStyle={styles.searchInput}
                            inputStyle={styles.searchInputText}
                            placeholder="Where will you explore next?"
                            onChangeText={this._handleSearchInput}
                            onSubmitEditing={this._handleSearchSubmit}
                        />
                    </View>

                    <View style={styles.contentContainer}>
                        <Image
                            source={require('../../res/img/startup-banner.png')}
                            resizeMode="stretch"
                            style={styles.mainBanner}
                        />

                        <ButtonGroup
                            onPress={this._updateIndex}
                            selectedIndex={this.selectedIndex}
                            buttons={buttons}
                            containerStyle={styles.menuHeight}
                        />

                        {this._displayZites()}
                    </View>
                </View>
            </ScrollView>
        );
    }

    componentDidAppear() {
        console.log('RNN', 'CTB.componentDidAppear');
    }

    componentDidDisappear() {
        console.log('RNN', 'CTB.componentDidDisappear');
    }

    componentDidMount() {
        /* Localize this. */
        const self = this;

        /* Handle registered app links. */
        // FIXME Android bug prevents deep linking when app is in BACKGROUND
        //       https://stackoverflow.com/a/47573863/514914
        Linking.getInitialURL()
            .then(url => {
                if (url) {
                    console.log('DEEP LINK DETECTED! Clicked url was: ' + url);

                    /* Initialize target. */
                    let target = '';

                    /* Parse zite address. */
                    if (url.slice(0, 23) === 'http://127.0.0.1:43110/') {
                        /* Extract target from URL. */
                        target = url.slice(23);
                    } else if (url.slice(0, 16) === 'https://0net.io/') {
                        /* Extract target from URL. */
                        target = url.slice(16);
                    } else if (url.slice(0, 15) === 'http://0net.io/') {
                        /* Extract target from URL. */
                        target = url.slice(15);
                    } else if (url.slice(0, 7) === '0net://') {
                        /* Extract target from URL. */
                        target = url.slice(7);
                    } else if (url.slice(0, 7) === 'zero://') {
                        /* Extract target from URL. */
                        target = url.slice(7);
                    }

                    /* Initialize the deep linked zite. */
                    self._initZite(target);
                }
            })
            .catch(err => console.error('An error occurred', err));
    }

    componentWillUnmount() {
        console.log('RNN', 'CTB.componentWillUnmount');
    }

    _handleSearchInput(_val) {
        console.log('_handleSearchInput', _val);

        /* Update search value. */
        this.searchVal = _val;
    }

    _handleSearchSubmit() {
        /* Retrieve the search value. */
        const searchVal = this.searchVal;

        /* Search for a Zitetag. */
        if (searchVal.indexOf('.bit') !== -1) {
            /* Retrieve dotBit names. */
            const names = require('../../res/names.json');

            /* Initialize the endoint. */
            const endpoint = names[searchVal];

            /* Handle unregistered dot-bit. */
            if (!endpoint) {
                // FIXME Provide the user with a popup message.
                throw `Oops! [ ${searchVal} ] is NOT registered on the Zeronet.`;
            }

            /* Initialize the zite. */
            return this._initZite(endpoint);
        }

        /* Search for Bitcoin address. */
        // FIXME We must validate for "valid" Bitcoin address
        if (searchVal.match(/^[1][a-km-zA-HJ-NP-Z1-9]{25,34}$/)) {
            /* Initialize the zite. */
            return this._initZite(searchVal);
        }

        /* Handle unavailable zite. */
        // FIXME: Provide the user with a popup message.
        throw `Oops! [ ${searchVal} ] cannot be found. ` +
            'Please check the address/tag and try your request again.';
    }

    _openScanner() {
        /* Open the WebView. */
        Navigation.push('zeronet.Main', {
            component: {
                id: 'zeronet.Camera',
                name: 'zeronet.Camera',
                options: {
                    topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true,
                    },
                },
                // passProps: { target }
            },
        });
    }

    _updateIndex(_selectedIndex) {
        this.selectedIndex = _selectedIndex;
    }

    _displayZites() {
        if (this.selectedIndex === 0) {
            return (
                <View style={[Styles.centerView, styles.notFound]}>
                    <Text style={styles.notFoundText}>no recent zites</Text>
                </View>
            );
        }

        if (this.selectedIndex === 1) {
            return (
                <View>
                    <Button
                        large
                        containerStyle={styles.mainButtons}
                        type="outline"
                        onPress={() => this._test3()}
                        icon={{
                            name: 'support',
                            type: 'font-awesome',
                            color: 'rgba(30, 180, 180, 0.8)',
                        }}
                        title="TEST TCP"
                    />
                    <View style={Styles.centerView}>
                        <Text>{this.state.test3Txt}</Text>
                    </View>

                    <Button
                        large
                        containerStyle={styles.mainButtons}
                        type="outline"
                        onPress={() => this._test2()}
                        icon={{
                            name: 'support',
                            type: 'font-awesome',
                            color: 'rgba(30, 180, 30, 0.8)',
                        }}
                        title="TEST WEBVIEW"
                    />

                    <Button
                        large
                        containerStyle={styles.mainButtons}
                        type="outline"
                        onPress={() => this._test()}
                        icon={{
                            name: 'support',
                            type: 'font-awesome',
                            color: 'rgba(30, 30, 180, 0.8)',
                        }}
                        title="TEST REALM"
                    />

                    <Button
                        large
                        containerStyle={styles.mainButtons}
                        type="outline"
                        onPress={() =>
                            this._initZite('1GUiDEr5E5XaFLBJBr78UTTZQgtC99Z8oa')
                        }
                        icon={{
                            name: 'support',
                            type: 'font-awesome',
                            color: 'rgba(180, 30, 30, 0.8)',
                        }}
                        title="USER GUIDE"
                    />

                    <Button
                        large
                        containerStyle={styles.mainButtons}
                        type="outline"
                        onPress={() =>
                            this._initZite('1ZTAGS56qz1zDDxW2Ky19pKzvnyqJDy6J')
                        }
                        icon={{
                            name: 'hashtag',
                            type: 'font-awesome',
                            color: 'rgba(30, 30, 180, 0.8)',
                        }}
                        title="ZITETAGS"
                    />

                    <Button
                        large
                        containerStyle={styles.mainButtons}
                        type="outline"
                        onPress={() =>
                            this._initZite('1D14naQY4s65YR6xrJDBHk9ufj2eLbK49C')
                        }
                        icon={{
                            name: 'legal',
                            type: 'font-awesome',
                            color: 'rgba(30, 30, 180, 0.8)',
                        }}
                        title="ABOUT D14NA"
                    />
                </View>
            );
        }

        if (this.selectedIndex === 2) {
            return (
                <View style={[Styles.centerView, styles.notFound]}>
                    <Text style={styles.notFoundText}>no trending zites</Text>
                </View>
            );
        }
    }

    verifyConfig(config, address) {
        // const bitcoinMessage = require('bitcoinjs-message');
        console.log('bitcoinMessage', bitcoinMessage);

        /**
         * Escape unicode characters.
         * Converts to a string representation of the unicode.
         */
        const escapeUnicode = function(str) {
            return str.replace(/[^\0-~]/g, function(ch) {
                return '\\u' + ('000' + ch.charCodeAt().toString(16)).slice(-4);
            });
        };

        try {
            /* Retrieve the signature. */
            const signature = config.signs[address];
            console.info('content.json signature', signature);

            /* Delete signs (as we can't verify ourselves in the signature). */
            delete config.signs;

            /* Convert the JSON to a string. */
            // NOTE: This matches the functionality of Python's `json.dumps` spacing.
            config = JSON.stringify(config)
                .replace(/":/g, '": ')
                .replace(/,"/g, ', "');

            /* Escape all unicode characters. */
            // NOTE: This matches the functionality of Python's `unicode` handling.
            config = escapeUnicode(config);

            /* Verify the Bitcoin signature. */
            const isValid = bitcoinMessage.verify(config, address, signature);
            console.info('content.json isValid', isValid);

            let test3Txt = this.state.test3Txt + '\n' + isValid;
            this.setState({test3Txt});
        } catch (err) {
            // FIXME WTF is going on here with `config.signs` being undefined.
            console.log('VERIFICATION ERROR: (we may just ignore)', err);
        }
    }

    _test3() {
        // const server = net
        //     .createServer(function(socket) {
        //         socket.write('excellent!');
        //     })
        //     .listen(12345);
        //
        // console.log(server);

        // console.log('NET', net);

        // const client = net.createConnection(12345);

        // const ws = new WebSocket('ws://176.223.135.154');
        const ws = new WebSocket('wss://supeer.host');

        ws.onopen = () => {
            // connection opened
            // ws.send('greetings from zeronet explorer'); // send a message
            ws.send('content');
        };

        ws.onmessage = e => {
            /* Retrieve RAW data. */
            const data = e.data;

            console.log('DATA', data);

            /* Check for ping. */
            if (e.data === 'ping') {
                return ws.send('pong');
            }

            /* Initialize JSON data. */
            let json = '';

            try {
                json = JSON.parse(data);
            } catch (err) {
                console.log('DATA PARSING ERROR:', err);
            }

            // a message was received
            console.log('incoming JSON', json);

            this.verifyConfig(json, '1NAMETAGa1cYwE8QsAFz4oqNt1KKGA2SFC');

            // let test3Txt = this.state.test3Txt + '\n' + JSON.stringify(json);
            // this.setState({test3Txt});
        };

        ws.onerror = e => {
            // an error occurred
            console.log('error', e.message);
        };

        ws.onclose = e => {
            // connection closed
            console.log('closed', e.code, e.reason);
        };
    }

    _test2() {
        const target = '/1D14naQY4s65YR6xrJDBHk9ufj2eLbK49C/index.html';

        Navigation.push('zeronet.Main', {
            component: {
                id: 'zeronet.Webview',
                name: 'zeronet.Webview',
                options: {
                    topBar: {
                        visible: false,
                        animate: false,
                        drawBehind: true,
                    },
                },
                passProps: {target},
            },
        });
    }

    _test() {
        const Realm = require('realm');

        // Define your models and their properties
        const CarSchema = {
            name: 'Car',
            properties: {
                make: 'string',
                model: 'string',
                miles: {type: 'int', default: 0},
            },
        };

        const PersonSchema = {
            name: 'Person',
            properties: {
                name: 'string',
                birthday: 'date',
                cars: 'Car[]',
                picture: 'data?', // optional property
            },
        };

        Realm.open({schema: [CarSchema, PersonSchema]})
            .then(realm => {
                // Create Realm objects and write to local storage
                realm.write(() => {
                    const myCar = realm.create('Car', {
                        make: 'Honda',
                        model: 'Civic',
                        miles: 1000,
                    });

                    myCar.miles += 20; // Update a property value
                });

                // Query Realm for all cars with a high mileage
                const cars = realm.objects('Car').filtered('miles > 1000');

                // Will return a Results object with our 1 car
                console.log('# of cars', cars.length);

                // Add another car
                realm.write(() => {
                    const myCar = realm.create('Car', {
                        make: 'Ford',
                        model: 'Focus',
                        miles: 2000,
                    });

                    console.log(myCar);
                });

                // Query results are updated in realtime
                console.log('# of cars', cars.length);
            })
            .catch(error => {
                console.log(error);
            });
    }

    // async _pex() {
    //     /* Initailize Peer0. */
    //     const peer0 = new Peer0(net, '104.129.16.31', 443); // zero.booth.moe
    //     console.log('peer0', peer0);
    //
    //     const peers = await peer0.pex('1Name2NXVi1RDPDgf5617UoW7xA6YrhM9F');
    //     console.log('RECEIVED PEERS', peers);
    // }

    _initZite(_target, _path) {
        // FIXME If the tag is NOT an address then we need to do a
        //       ZeroName lookup to retrieve the address
        const address = _target;

        // FIXME Handle the path
        // const path = _path;

        /* Set the zite address. */
        stores.Stage.initZite(address);

        /* Open the stage window. */
        Navigation.mergeOptions('zeronet.Stage', {
            sideMenu: {
                left: {
                    visible: true,
                },
            },
        });
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        padding: 20,
    },

    header: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 1.0)',
    },
    btnQrCode: {
        marginTop: 1,
        marginBottom: 1,
        paddingTop: Platform.OS === 'ios' ? 15 : 20,
        paddingLeft: 8,
        backgroundColor: 'rgba(57, 62, 66, 1.0)',
    },
    searchInput: {
        flex: 1,
    },
    searchInputText: {
        // paddingLeft: 5,
        paddingBottom: Platform.OS === 'ios' ? -5 : 9,
    },

    menuHeight: {
        height: 30,
    },
    mainBanner: {
        width: '100%',
        height: 160,

        marginTop: 25,
        marginBottom: 25,
    },
    mainButtons: {
        marginTop: 10,
        borderRadius: 3,
        marginHorizontal: 30,
    },

    notFound: {
        height: 75,
    },
    notFoundText: {
        fontStyle: 'italic',
    },
});

export default StartupFrame;
