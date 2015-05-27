/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 27.05.2015
 */
'use strict';
//socket.io assumes navigator.userAgent is a string, supply a dummy one to make it happy
window.navigator.userAgent = "react-native";
/**
 * Required Modules
 */
var React    = require('react-native'),
    firebase = require('./../firebase-debug'),
    Loading  = require('./../components/Loading'),
    {Stylesheet, VenuesStyles, ListStyles} = require('../utils/Styles');

var {
    StyleSheet,
    View,
    Text,
    Component,
    ListView,
    TouchableHighlight,
    } = React;

var RefreshableListView = require('react-native-refreshable-listview');
var baseDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

/**
 * Venues View
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

    renderVenue(venue) {
        return (
            <VenuesItemView
                venue={venue}
                />
        )
    }

    render() {
        if (this.state.dataSource.getRowCount() === 0) {
            return (
                <Loading>Venues</Loading>
            )
        } else {
            return (
                <RefreshableListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderVenue}
                    refreshDescription="Refreshing top stories"
                    />
            )
        }
    }
}

/**
 * Item View
 */
class VenuesItemView extends Component{
    renderTitle(venue) {
        return (
            <Text style={ListStyles.infoTitle}>
                {venue.name}
            </Text>
        )
    }

    renderByline(venue) {
        return (
            <View style={[ListStyles.row, ListStyles.byline]}>
                <Badge>0 points</Badge>
                <View>
                    <Text style={ListStyles.infoAddress} numberOfLines={1}>
                        {' '}{venue.address}
                    </Text>
                </View>
            </View>
        )
    }

    renderInfo() {
        var {venue} = this.props

        return (
            <View style={Stylesheet.textContainer}>
                <TouchableHighlight onPress={() => console.log('fuck')}>
                    <View style={ListStyles.infoCell}>
                        {this.renderTitle(venue)}
                        {this.renderByline(venue)}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
            <View style={Stylesheet.white}>
                <View style={[ListStyles.row, ListStyles.itemRow]}>
                    {this.renderInfo()}
                </View>
                <View style={ListStyles.cellBorder} />
            </View>
        )
    }
}

/**
 * Badge
 */
class Badge extends Component {
    render() {
        return (
            <View style={ListStyles.badge}>
                <Text style={ListStyles.badgeText} children={this.props.children} />
            </View>
        )
    }
}

/**
 * Styles
 */
module.exports = VenuesView;
