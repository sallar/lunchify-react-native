/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

var React      = require('react-native'),
    Helpers    = require('./utils/Helpers'),
    Navigator  = require('./views/Navigator'),
    VenuesView = require('./views/Venues');

var {
    AppRegistry,
    Component,
    Text,
    StatusBarIOS,
} = React;

/* API Location */
global.api = 'http://lunchify.fi:8080/api';

/**
 * Main App
 */
class Lunchify extends Component {
    componentDidMount() {
        StatusBarIOS.setStyle(1, false);
    }

    render() {
        return(
            <Navigator
                component={VenuesView}
                title="Venues"
                />
        );
    }
}

/**
 * Register
 */
AppRegistry.registerComponent('Lunchify', () => Lunchify);