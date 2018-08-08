import {
    Platform,
    StyleSheet
} from 'react-native'

// import Colors from './Colors'
// import Layout from './Layout'

export default StyleSheet.create({
    /* Containers */
    container: {
        flex            : 1,
        backgroundColor : '#fff'
    },
    outerContainer: {
        margin: 5
    },
    contentContainer: {
        margin  : 5,
        padding : 5
    },
    modalContainer: {
        margin  : 5,
        padding : 5,

        backgroundColor : 'rgba(255, 255, 255, 0.9)',

        borderRadius : 10,
        borderWidth  : 2,
        // borderColor  : Colors.tintColor
    },
    scrollContainer: {

    },

    /* Headings */
    banner: {
        // width  : Layout.width,
        // height : Layout.width * 0.25
    },

    /* Rows */
    row: {
        flexDirection : 'row',
    },
    rowAligned: {
        flexDirection : 'row',
        alignItems    : 'center'
    },
    rowCentered: {
        flexDirection  : 'row',
        justifyContent : 'space-around'
    },
    rowJustified: {
        flexDirection  : 'row',
        justifyContent : 'space-between'
    },

    /* Buttons */
    button: {
        flexDirection   : 'row',
        height          : 50,
        backgroundColor : 'rgb(68, 92, 214)',
        justifyContent  : 'center',
        alignItems      : 'center',
        padding         : 15,
    },
    buttonBlock: {
        flex            : 1,
        flexDirection   : 'row',
        height          : 50,
        backgroundColor : 'rgb(68, 92, 214)',
        justifyContent  : 'center',
        alignItems      : 'center',
        padding         : 15,
    },
    buttonCancel: {
        flexDirection   : 'row',
        height          : 50,
        backgroundColor : 'rgb(214, 68, 92)',
        justifyContent  : 'center',
        alignItems      : 'center',
        padding         : 15,
    },
    buttonBlockCancel: {
        flex            : 1,
        flexDirection   : 'row',
        height          : 50,
        backgroundColor : 'rgb(214, 68, 92)',
        justifyContent  : 'center',
        alignItems      : 'center',
        padding         : 15,
    },
    buttonText: {
        color      : 'white',
        textAlign  : 'center',
        fontSize   : 16,
        fontWeight : 'bold'
    },
    buttonTextLg: {
        color      : 'white',
        textAlign  : 'center',
        fontSize   : 24,
        fontWeight : 'bold'
    },

    buttonHelpText: {
        fontSize : 10,
        color    : 'grey'
    },

    actionButtonMenu: {
        fontSize  : 36,
        color     : 'rgb(255, 255, 255)',
    },
    actionButtonClose: {
        fontSize  : 36,
        color     : 'rgb(255, 255, 255)',
    },
    actionButtonIcon: {
        fontSize : 22,
        height   : 22,
        color    : 'rgb(255, 255, 255)'
    },
    abBackdrop: {
        backgroundColor : 'rgba(30, 30, 30, 0.85)',

        position : 'absolute',
        top      : 0,
        left     : 0,
        bottom   : 0,
        right    : 0
    },

    /* Icons */
    contextHelpIcon: {
        marginLeft : 5,
        fontSize   : 14,
        // color      : Colors.helpIcon
    },
    tabBarIcon: {
        fontSize : 22,
        // width    : 45,
        // height   : 45
    },
    btnToolkitPanel: {
        marginRight : 12,
        fontSize    : 32,
        fontWeight  : 'bold',
        // color       : Colors.tabIconSelected
    },


    walletWeb3Container: {
        marginHorizontal: 50,
    },

    hyperlink: {
        color: '#c33'
    },

    /* Layout */
    header: {
        // width  : Layout.width,
        // height : Layout.width * 0.25,

        backgroundColor : 'rgb(255, 255, 255)',

        shadowColor   : 'rgb(0, 0, 0)',
        shadowOffset  : { width: 0, height: 3 },
        shadowOpacity : 0.50,
        shadowRadius  : 3
    },
    divider: {
        height          : 1,
        marginVertical  : 15,
        backgroundColor : 'rgba(0, 0, 0, 0.25)'
    },

    centerView: {
        flex           : 1,
        alignItems     : 'center',
        justifyContent : 'center'
    },

    loading: {
        // height         : Layout.width * 0.5,
        alignItems     : 'center',
        justifyContent : 'center'
    },

    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },

    /* Settings List */
    settingsHeader: {
        marginTop : -5
    },
    settingsIcon: {
        fontSize : 28,
        width    : 40,

        marginLeft  : 15,
        marginRight : 5,

        textAlign      : 'center',
        alignSelf      : 'center',
        justifyContent : 'center'
    },
    settingsList: {
        flex            : 1,
        backgroundColor : '#f6f6f6'
    },
    settingsHeadingText: {
        // color        : Colors.tintColor,
        marginBottom : 10,
        fontWeight   : '500'
    },
    settingsItemText: {
        color    : 'black',
        fontSize : 16
    },
    settingsInfoText: {
        fontWeight: 'bold',
        // color     : Colors.tintColor
    },
    settingsBetaText: {
        fontWeight: 'bold',
        fontStyle : 'italic',
        color     : 'rgb(180, 180, 180)',
        fontSize  : 11
    },

    /* Notices */
    copyright: {
        alignItems: 'center'
    },
    copyrightText: {
        textAlign : 'center',
        fontSize  : 8,
        color     : 'rgba(90, 90, 90, 0.5)'
    },

    /* Cards */
    cardHeader: {
        flexDirection   : 'row',
        padding         : 15,
        backgroundColor : 'rgba(91, 85, 198, 0.9)',
        alignItems      : 'center'
    },
    cardHeaderIcon: {
        width       : 40,
        height      : 40,
        marginRight : 15
    },
    cardHeaderText: {
        // width     : Layout.width - 200,
        color     : 'rgb(230, 230, 230)',
        fontSize  : 24,
        // marginTop : 5
    },
    cardHeaderButton: {
        position : 'absolute',
        top      : 10,
        right    : 10
    },
    postedAt: {
        paddingTop  : 5,
        paddingLeft : 5
    },
    postedAtText: {
        fontSize  : 9,
        textAlign : 'right',
        color     : 'rgb(150, 150, 150)'
    },

    /* Text */
    heading: {
        padding: 10
    },
    headingText: {
        fontSize   : 28,
        // fontWeight : 'bold',
        textAlign  : 'center',
        // color      : Colors.tintColor
    }

})
