/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';

var React      = require('react-native'),
    Helpers    = require('./utils/Helpers'),
    //Navigator  = require('./views/Navigator'),
    Navigator  = require('./views/NewNavigation'),
    VenuesView = require('./views/Venues');

var {
    AppRegistry,
    Component,
    Text,
        StatusBarIOS,
    } = React;

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
AppRegistry.registerComponent('reactClient', () => Lunchify);
module.exports = Lunchify;
