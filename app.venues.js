'use strict';
//socket.io assumes navigator.userAgent is a string, supply a dummy one to make it happy
window.navigator.userAgent = "react-native";
/**
 * Required Modules
 */
var React         = require('react-native'),
    Navigator     = require('./app.navigator'),
    firebase      = require('./firebase-debug'),
    {Stylesheet, VenuesStyles} = require('./app.styles');

var {
    StyleSheet,
    View,
    Text,
    Component,
    ListView,
    } = React;

var RefreshableListView = require('react-native-refreshable-listview');
var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

/**
 * Venues View
 */
class Venues extends Component {
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
 * Navigation View
 */
class VenuesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: baseDataSource
        };
    }

    componentDidMount() {
        var ref = new Firebase("https://lunchify.firebaseio.com/areas/keilaniemi/venues");
        ref.on("value",function(snapshot){
            //this.setState(snapshot.val())
            this.setState({
                dataSource: baseDataSource.cloneWithRows(snapshot.val())
            });
        }.bind(this))
    }

    renderStory(story) {
        console.log(story);
        return (
            <View><Text>{story.name}</Text></View>
        )
    }

    render() {
        if (this.state.dataSource.getRowCount() === 0) {
            return (
                <Text>Wait A Moment</Text>
            )
        } else {
            return (
                <RefreshableListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderStory}
                    refreshDescription="Refreshing top stories"
                    />
            )
        }
    }
}

/**
 * Styles
 */
module.exports = Venues;
