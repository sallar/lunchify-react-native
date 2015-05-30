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
    Helpers  = require('../utils/Helpers'),
    RCTRefreshControl = require('RCTRefreshControl'),
    {Stylesheet, VenuesStyles, ListStyles, IndicatorStyles} = require('../utils/Styles'),
    LISTVIEW = 'ListView';

var {
    StyleSheet,
    View,
    Text,
    Component,
    ListView,
    TouchableHighlight,
    } = React;

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
        var ref = new Firebase("https://lunchify.firebaseio.com/areas/keilaniemi/venues"),
            watchID = null;

        // Geolocation & Data
        navigator.geolocation.getCurrentPosition(
            function(initialPosition) {
                ref.on("value",function(snapshot) {
                    // Calc Distances
                    var venues = this.calcDistances(snapshot, initialPosition);

                    // Set State
                    this.setState({
                        venues: snapshot,
                        dataSource: baseDataSource.cloneWithRows(venues),
                        initialPosition: initialPosition
                    });
                }.bind(this));
            }.bind(this),
            function(error) {
                console.error(error);
            }
        );

        // ScrollView
        RCTRefreshControl.configure({
            node: this.refs[LISTVIEW]
        }, () => {
            this.recalcDistance();
        });
    }

    calcDistances(data, geo) {
        var venues = [];

        // Calc Distances
        data.forEach(function(item) {
            var item = item.val();
            item.distance = Helpers.calcDistance({
                lat: geo.coords.latitude,
                lng: geo.coords.longitude
            }, {
                lat: item.lat,
                lng: item.lng
            });
            venues.push(item);
        });

        // Closest first
        venues.sort(function(a, b) {
            return a.distance - b.distance;
        });

        return venues;
    }

    recalcDistance() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                setTimeout(function() {
                    this.setState({
                        dataSource: baseDataSource.cloneWithRows(
                            this.calcDistances(this.state.venues, position)
                        ),
                        lastPosition: position
                    });
                    RCTRefreshControl.endRefreshing(this.refs[LISTVIEW]);
                }.bind(this), 500);
            }.bind(this)
        );
    }

    renderVenue(venue) {
        return (
            <VenuesItemView
                venue={venue}
                />
        )
    }

    render() {
        return (
            <ListView
                ref={LISTVIEW}
                dataSource={this.state.dataSource}
                renderRow={this.renderVenue}
                />
        )
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
                <Badge>{Helpers.formatDistance(venue.distance)}</Badge>
                <View>
                    <Text style={[Stylesheet.text, ListStyles.infoAddress]} numberOfLines={1}>
                        {' '} {venue.address}
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
                <Text style={[Stylesheet.text, ListStyles.badgeText]} children={this.props.children} />
            </View>
        )
    }
}

/**
 * Styles
 */
module.exports = VenuesView;
