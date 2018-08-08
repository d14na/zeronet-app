import { Navigation } from 'react-native-navigation'

/* STARTUP */
import Startup from '../frames/Startup'

/* CANVAS */
import Canvas from '../frames/Canvas'

/* GAMEPAD */
import Player0ne from '../frames/Player0ne'

/* P0RTAL */
import P0rtal from '../frames/P0rtal'

import {
    C0urier as P0rtalC0urier,
    Help as P0rtalHelp,
    Influence as P0rtalInfluence,
    Profile as P0rtalProfile,
    Signup as P0rtalSignup,
    Streams as P0rtalStreams
} from './P0rtal'

/* STAGE */
import Stage from '../frames/Stage'

/* STUDIO */
import Studi0 from '../frames/Studi0'

/* WEBVIEW */
import Webview from '../frames/Webview'

/* COMPONENTS */
import { P0rtalTopBar } from '../components'

/* Register all screens of the app (including internal ones). */
export function registerScreens() {
    /* Startup frame */
    Navigation.registerComponent('zeronet.Startup', () => Startup)

    /* Graphics art & (lottie-style) animation canvas */
    Navigation.registerComponent('zeronet.Canvas', () => Canvas)

    /* Player0ne Gamepad Controller */
    Navigation.registerComponent('zeronet.Player0ne', () => Player0ne)

    /* Personalized user p0rtal */
    Navigation.registerComponent('zeronet.P0rtal', () => P0rtal)
    Navigation.registerComponent('zeronet.P0rtal.C0urier', () => P0rtalC0urier)
    Navigation.registerComponent('zeronet.P0rtal.Help', () => P0rtalHelp)
    Navigation.registerComponent('zeronet.P0rtal.Influence', () => P0rtalInfluence)
    Navigation.registerComponent('zeronet.P0rtal.Profile', () => P0rtalProfile)
    Navigation.registerComponent('zeronet.P0rtal.Signup', () => P0rtalSignup)
    Navigation.registerComponent('zeronet.P0rtal.Streams', () => P0rtalStreams)

    /* Contextual stage */
    Navigation.registerComponent('zeronet.Stage', () => Stage)

    /* Audio and visual media studio */
    Navigation.registerComponent('zeronet.Studi0', () => Studi0)

    /* Standard webview */
    Navigation.registerComponent('zeronet.Webview', () => Webview)

    /* Navigational Components */
    Navigation.registerComponent('zeronet.P0rtalTopBar', () => P0rtalTopBar)
}
