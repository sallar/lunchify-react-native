/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';


var React      = require('react-native');
var Helpers    = require('./app.helpers');
var Venues = require('./app.venues');

var {
    AppRegistry,
    StatusBarIOS,
    TabBarIOS,
    Component,
    Text,
    } = React;

/**
 * Main App
 */
class ReittiGuide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'venues'
        };
        this.views = [{
            key: 'venues',
            title: 'Venues',
            icon: 'map-location',
            component: <Venues/>
        }];
    }

    renderItems() {
        var views  = [];

        this.views.forEach((view) => {
            views.push((
                <TabBarIOS.Item
                    title={view.title}
                    selected={this.state.selectedTab === view.key}
                    icon={Helpers.icon(view.icon)}
                    selectedIcon={Helpers.icon(view.icon + '-filled')}
                    key={view.key}
                    onPress={() => {
                    this.setState({
                        selectedTab: view.key,
                    });
                }}>
                    {view.component}
                </TabBarIOS.Item>
            ));
        });

        return views;
    }

    render() {
        // StatusBarIOS.setStyle(StatusBarIOS.Style['lightContent']);

        return(
            <TabBarIOS>
                {this.renderItems()}
            </TabBarIOS>
        );
    }
}

/**
 * Register
 */
AppRegistry.registerComponent('reactClient', () => ReittiGuide);
module.exports = ReittiGuide;
